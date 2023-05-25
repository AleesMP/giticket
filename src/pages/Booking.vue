<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'

const route = useRoute()

let booking = ref()

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
    <div v-if="booking" class="text-white">Esta es la reserva con id: {{ booking.id }}</div>
</template>