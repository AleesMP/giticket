<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'
import VueQrcode from '@chenfengyuan/vue-qrcode'

const route = useRoute()

let booking = ref()

let QRCodeUrl = computed(() => booking.value ? window.location.host + '/reservas/' + booking.value.id : null)

onMounted(async () => {
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
            return data[0]
        } else {
            router.push('/404')
        }
    }
}

</script>
<template>
    <div v-if="booking">
        <div class="text-white">Esta es la reserva con id: {{ booking.id }}</div>
        <vue-qrcode v-if="QRCodeUrl" id="qr-code-img" :value="QRCodeUrl" tag="img" class="w-64 rounded"></vue-qrcode>
    </div>
</template>