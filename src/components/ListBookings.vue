<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../services/supabase";

let bookings = ref([]);
const fetchBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select()
    .order("created_at");

  bookings.value = data;
};

const refreshBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from("bookings")
    .select()
    .eq("id", bookingData.id);

  if (error) {
    console.log(error);
  } else {
    const bookingIndexToUpdate = bookings.value.indexOf(
      (booking) => bookingData.id === booking.id
    );
    bookings.value[bookingIndexToUpdate] = data[0];
  }
};

onMounted(() => {
  // Recuperar las peliculas desde la bd supabase
  fetchBookings();
});

defineExpose({
  fetchBookings,
  refreshBooking,
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl">Listado de reservas:</h1>
    <table class="border-collapse table-auto" v-if="bookings">
      <thead>
        <tr>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            UUID
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Movie ID
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Email
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Fecha seleccionada
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Hora seleccionada
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Fecha de creación
          </th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
            Última actualización
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="booking in bookings" :key="booking.id">
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ booking.id }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ booking.movie_id }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ booking.email }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ booking.selected_date }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ booking.selected_hour }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ new Date(booking.created_at).toISOString() }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
            {{ new Date(booking.validated_at).toISOString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay ninguna reserva.</div>
  </div>
</template>
