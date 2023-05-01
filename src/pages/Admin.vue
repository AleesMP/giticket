<script setup>
import CreateMovie from '../components/CreateMovie.vue'
import ListMovies from '../components/ListMovies.vue'
import UpdateMovies from '../components/UpdateMovies.vue'
</script>

<template>
  <div class="flex flex-col gap-8 text-white p-4">
    <CreateMovie />
    <ListMovies/>
    <UpdateMovies/>
  </div>
</template>
