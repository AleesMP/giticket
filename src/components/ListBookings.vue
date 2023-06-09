<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../services/supabase";
import { useToast } from 'vue-toastification'

const toast = useToast()

let bookings = ref(null);
const fetchBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select()
    .order("created_at");

  bookings.value = data;
};

const validateBooking = async (bookingId) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ validated_at: new Date() })
    .eq('id', bookingId)
    .select()

  if (error) {
    toast.error('Error al listar las reservas')
  } else {
    if (data) {
      const bookingIndexToUpdate = bookings.value.findIndex(
        (booking) => bookingId === booking.id
      );
      
      bookings.value[bookingIndexToUpdate] = data[0];
      toast.success('Se ha validado la reserva correctamente')
    }
  }
}

onMounted(() => {
  // Recuperar las reservas desde la bd supabase
  fetchBookings();
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl">Listado de reservas:</h1>
    <div class="w-full overflow-x-auto">
      <table v-if="bookings" class="w-full">
        <thead>
          <tr>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">ID reserva</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">ID película</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Email</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Fecha seleccionada</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Hora seleccionada</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Fecha de creación</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Validación</th>
          </tr>
        </thead>
        <tbody v-if="bookings.length" class="bg-slate-800">
          <tr v-for="booking in bookings" :key="booking.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              <router-link :to="{ name: 'Booking', params: { bookingUuid: booking.id } }" class="hover:underline">{{ booking.id }}</router-link>
            </td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ booking.movie_id }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ booking.email }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ booking.selected_date }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ booking.selected_hour }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ (new Date(booking.created_at)).toLocaleString() }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              <span v-if="booking.validated_at">{{ (new Date(booking.validated_at)).toLocaleString() }}</span>
              <button v-else class="px-2 cursor-pointer bg-slate-600 rounded hover:bg-slate-500" @click="validateBooking(booking.id)">Validar</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="bg-slate-800">
          <tr>
            <td colspan="7" class="border-b border-slate-700 p-4 pl-8 text-slate-400">No hay ninguna reserva.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
