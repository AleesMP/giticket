<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { setDefaultOptions, formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'


const props = defineProps(['store'])

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

const route = useRoute()

let booking = ref()

let QRCodeUrl = computed(() => booking.value ? 'https://' + window.location.host + '/reservas/' + booking.value.id : null)

onMounted(async () => {
    initLocale()

    booking.value = await fetchBookingByUuid(route.params.bookingUuid)
})

const fetchBookingByUuid = async (uuid) => {
    const { data, error } = await supabase
        .from('bookings')
        .select()
        .eq('id', uuid)

    if (error) {
        console.log(error)
    } else {
        if (data.length) {
            let bookingTmp = data[0]

            bookingTmp.movie = await fetchBookingMovie(bookingTmp.movie_id)

            return bookingTmp
        } else {
            router.push('/404')
        }
    }
}

const fetchBookingMovie = async (movieId) => {
    const { data, error } = await supabase
        .from('movies')
        .select()
        .eq('id', movieId)

    if (error) {
        console.log(error)
    } else {
        return data.length ? data[0] : null
    }
}

const validateBooking = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ validated_at: new Date() })
    .eq('id', booking.value.id)
    .select()

  if (error) {
    console.log(error)
  }
}

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
</script>
<template>
    <div v-if="booking" class="flex flex-col text-white p-8 gap-8">
        <div class="text-2xl lg:text-3xl">Este es el código QR que debes presentar en taquilla</div>
        <div class="flex flex-col items-center justify-around gap-6 lg:flex-row">
            <div v-if="QRCodeUrl" class="flex flex-col gap-4">
                <vue-qrcode id="qr-code-img" :value="QRCodeUrl" tag="img" class="w-72 h-72 rounded"></vue-qrcode>
                <span v-if="booking.validated_at" class="text-center">✅ Validado {{ formatRelative(new Date(booking.validated_at), new Date()) }}</span>
                <div class="text-center" v-else>
                    <button v-if="props.store.currentUser" class="rounded py-1 px-4 font-bold bg-orange-500 hover:bg-orange-400" @click="validateBooking">Validar</button>
                    <span v-else>Pendiente de validación</span>
                </div>
            </div>
            <div v-if="booking.movie" class="flex flex-col rounded gap-4 mt-8 lg:mt-none lg:border lg:border-slate-200 lg:p-4 lg:w-2/3">
                <div class="text-4xl">{{ booking.movie.title }}</div>
                <div class="flex flex-col lg:flex-row gap-4">
                    <img class="w-64 rounded-md mx-auto " :src="supabaseStorageUrl + booking.movie.image" :alt="`${booking.movie.title} - Imagen`">
                    <div class="flex flex-wrap mx-2">
                        <div class="flex flex-col p-2">
                            <div>
                                <span class="text-2xl">Sinopsis</span>
                                <div class="text-xl p-2">{{ booking.movie.synopsis }}</div>
                            </div>
                            <div>
                                <span class="text-2xl">Año</span>
                                <div class="text-lg p-2">{{ booking.movie.year }}</div>
                            </div>
                            <div>
                                <span class="text-2xl">Género</span>
                                <div class="text-lg p-2">{{ booking.movie.genre }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>