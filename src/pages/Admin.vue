<script setup>
import { ref } from 'vue'
import CreateMovie from '../components/CreateMovie.vue'
import ListMovies from '../components/ListMovies.vue'
import UpdateMovies from '../components/UpdateMovies.vue'

const handleCreateMovie = () => {
  listComponent.value.fetchMovies()
}

const handleUpdateMovie = () => {
  listComponent.value.fetchMovies()
}

const listComponent = ref(null)

</script>

<template>
  <div class="flex flex-col gap-8 text-white p-4">
    <CreateMovie @createMovie="handleCreateMovie" />
    <ListMovies ref="listComponent"/>
    <UpdateMovies @updateMovie="handleUpdateMovie"/>
  </div>
</template>
