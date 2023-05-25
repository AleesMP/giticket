<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'
import { setDefaultOptions, addDays, eachDayOfInterval, isBefore, format, formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'
import VueQrcode from '@chenfengyuan/vue-qrcode'

const route = useRoute()
const router = useRouter()

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

let movie = ref()

let availableDates = ref([])
let selectedDate = ref()

let availableHours = ref([])
let selectedHour = ref()

let booking = ref()
let bookingEmail = ref('')
let QRCodeUrl = computed(() => booking.value ? window.location.host + '/reservas/' + booking.value.id : null)

onMounted(async () => {
    initLocale()

    movie.value = await fetchMovieBySlug(route.params.movieSlug)

    availableDates.value = calculateAvailableDates(new Date(movie.value.released_at))
    selectedDate.value = availableDates.value[0].datetime

    availableHours.value = calculateAvailableHours(selectedDate.value)
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

const calculateAvailableDates = (releaseDate) => {
    const MAX_DAYS = 3
    const todayDate = new Date()
    const startDate = isBefore(todayDate, releaseDate) ? releaseDate : todayDate
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
    const specialDaysOfWeek = ['Miércoles', 'Sábado', 'Domingo']

    return specialDaysOfWeek.includes(dayOfWeek) ? ['17:00', '18:00', '21:00'] : ['16:00', '17:00']
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

            await setQRCodeImg()
        }
    }
}
const setQRCodeImg = async () => {
    setTimeout(async () => {
        const { data, error } = await supabase
            .from('bookings')
            .update({
                qr_code_img: document.getElementById('qr-code-img').src
            })
            .eq('id', booking.value.id)
            .select()
    
        if (error) {
            console.log(error)
        } else {
            booking.value = data[0]
        }
    }, 1000)
}

const goBack = () => {
    router.push('/')
}
</script>
<template>
    <div v-if="movie" class="flex flex-col gap-4 text-white">
        <div class="flex flex-col gap-4">
            <div class="text-4xl">{{ movie.title }}</div>
            <img class="w-64" :src="supabaseStorageUrl + movie.image" :alt="`${movie.title} - Imagen`">
            <div class="text-2xl">{{ movie.year }} - {{ movie.genre }}</div>
            <div class="text-4xl">{{ movie.synopsis }}</div>
        </div>

        <form class="flex flex-col p-4 border rounded border-slate-600" @submit.prevent="bookMovie">
            <div>Reservas</div>
            <div>
                <label for="selectedDate">Listado de días</label>
                <select class="bg-slate-600 rounded px-2 py-1" name="selectedDate" v-model="selectedDate">
                    <option v-for="availableDate in availableDates" :key="availableDate.datetime"
                        :value="availableDate.datetime">{{ availableDate.label }}</option>
                </select>
            </div>
            <div>
                <div>Listado de horas</div>
                <div class="flex gap-2">
                    <div v-for="availableHour in availableHours" :key="availableHour" :value="availableHour"
                        class="inline-flex justify-center items-center p-1.5 bg-slate-600 rounded cursor-pointer" :class="{'bg-slate-900': availableHour === selectedHour}" @click="selectedHour = availableHour">{{ availableHour }}</div>
                </div>
            </div>
            <div>
                <label for="bookingEmail">Dirección de correo electrónico</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="bookingEmail" name="bookingEmail" type="email" required />
            </div>

            <vue-qrcode v-if="QRCodeUrl" id="qr-code-img" :value="QRCodeUrl" tag="img" class="w-64 rounded"></vue-qrcode>

            <button type="submit" class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3">Reservar</button>
        </form>

        <button class="px-4 py-2 rounded font-semibold bg-slate-600 w-1/3" @click="goBack">Ir atras</button>
    </div>
</template>
