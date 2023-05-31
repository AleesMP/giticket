<script setup>
 import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'
import { plunk, getBody } from '../services/plunk'
import { setDefaultOptions, addDays, eachDayOfInterval, isBefore, format, formatRelative, isEqual } from 'date-fns'
import { es } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

let movie = ref()

let availableDates = ref([])
let selectedDate = ref()

let availableHours = computed(() => calculateAvailableHours(selectedDate.value))
let selectedHour = ref()

let booking = ref()
let bookingEmail = ref('')
let bookingUrl = computed(() => booking.value ? window.location.host + '/reservas/' + booking.value.id : null)

onMounted(async () => {
    initLocale()

    movie.value = await fetchMovieBySlug(route.params.movieSlug)

    availableDates.value = calculateAvailableDates()
    selectedDate.value = availableDates.value[0].datetime
    
    selectedHour.value = availableHours.value[0]
})

const initLocale = () => {
    const formatRelativeLocale = {
        lastWeek: "'el' eeee 'pasado,' dd 'de' MMMM",
        yesterday: "'ayer,' dd 'de' MMMM",
        today: "'hoy,' dd 'de' MMMM",
        tomorrow: "'mañana,' dd 'de' MMMM",
        nextWeek: "eeee',' dd 'de' MMMM",
        other: "'el próximo' eeee',' dd 'de' MMMM",
    }

    const locale = {
        ...es,
        formatRelative: token => formatRelativeLocale[token]
    }

    setDefaultOptions({ locale: locale })
}

const calculateAvailableDates = () => {
    const MAX_DAYS = 5
    const todayDate = new Date()
    const startDate = todayDate
    const endDate = addDays(startDate, MAX_DAYS)

    return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => {
        return {
            datetime: date,
            label: formatRelative(date, todayDate)
        }
    })
}

const calculateAvailableHours = (selectedDate) => {
    const dayOfWeek = format(selectedDate, 'iiii')
    const specialDaysOfWeek = ['miércoles', 'sábado', 'domingo']
    const availableHours = specialDaysOfWeek.includes(dayOfWeek) ? ['16:00', '18:45', '19:30', '20:45', '22:00', '23:30'] : ['16:00', '18:30', '19:45', '22:00', '22:45']

    selectedHour.value = availableHours[0]

    return availableHours
}

const fetchMovieBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('movies')
        .select()
        .eq('slug', slug)

    if (error) {
        console.log(error)
    } else {
        if (data.length) {
            return data[0]
        } else {
            router.push('/404')
        }
    }
}

const bookMovie = async () => {
    if (bookingEmail.value) {
        const { data, error } = await supabase
            .from('bookings')
            .insert({
                email: bookingEmail.value,
                movie_id: movie.value.id,
                selected_date: selectedDate.value,
                selected_hour: selectedHour.value,
            })
            .select()

        if (error) {
            console.log(error)
        } else {
            booking.value = data[0]

            await plunk.emails.send({
                to: bookingEmail.value,
                subject: `Recibo de la reserva - ${movie.value.title}`,
                body: getBody({
                    movieTitle: movie.value.title,
                    bookingDate: availableDates.value.find((dateObj) => isEqual(dateObj.datetime, selectedDate.value))?.label,
                    bookingHour: selectedHour.value,
                    bookingURL: bookingUrl.value
                })
            })
        }
    }
}

const goBack = () => {
    router.push('/')
}
</script>
<template>
    <div v-if="movie" class="flex flex-col gap-8 p-8 text-white">
        <div class="text-4xl">{{ movie.title }}</div>
        <div class="flex flex-col gap-4 md:flex-row">
            <img class="w-64 object-contain rounded-md self-center" :src="supabaseStorageUrl + movie.image" :alt="`${movie.title} - Imagen`">
            <div class="flex flex-wrap mx-2">
                <div class="flex flex-col p-2">
                    <div>
                        <span>Sinopsis</span>
                        <div class="text-2xl p-2">{{ movie.synopsis }}</div>
                    </div>
                    <div>
                        <span>Año:</span>
                        <div class="text-xl p-2">{{ movie.year }}</div>
                    </div>
                    <div>
                        <span>Género:</span>
                        <div class="text-xl p-2">{{ movie.genre }}</div>
                    </div>
                </div>
            </div>
        </div>
        <form class="flex flex-col p-5 border rounded-md border-slate-600 gap-4 md:max-w-screen-sm" @submit.prevent="bookMovie">
            <div class="flex flex-col gap-4 justify-between md:flex-row md:items-center">
                <label for="selectedDate">Listado de días</label>
                <select class="bg-slate-600 rounded px-2 py-1 w-full md:w-72" name="selectedDate" v-model="selectedDate">
                    <option v-for="availableDate in availableDates" :key="availableDate.datetime"
                        :value="availableDate.datetime">{{ availableDate.label }}</option>
                </select>
            </div>
            <div class="flex flex-col gap-4 justify-between md:flex-row md:items-center">
                <div>Listado de horas</div>
                <div class="flex flex-wrap gap-2">
                    <div v-for="availableHour in availableHours" :key="availableHour" :value="availableHour"
                        class="inline-flex justify-center items-center p-1.5 bg-slate-600 rounded cursor-pointer"
                        :class="{ 'bg-slate-800': availableHour === selectedHour }" @click="selectedHour = availableHour">{{
                            availableHour }}</div>
                </div>
            </div>
            <div class="flex flex-col gap-4 justify-between md:flex-row md:items-center">
                <label for="bookingEmail">Dirección de correo electrónico</label>
                <input class="bg-slate-600 rounded px-2 py-1 w-full md:w-72" v-model="bookingEmail" name="bookingEmail" type="email"
                    placeholder="ejemplo@ejemplo.com" required />
            </div>
            <div v-if="bookingUrl">✅ Se ha reservado correctamente. En breves recibirás un correo eléctronico con los datos de la reserva.</div>
            <button v-else type="submit" class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3">Reservar</button>
        </form>

        <button class="px-4 py-2 rounded font-semibold bg-slate-600 w-48" @click="goBack">Ir atras</button>
    </div>
</template>
