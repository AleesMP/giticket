<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'
import DeleteMovie from './DeleteMovie.vue'
import FormMovie from './FormMovie.vue';

let selectedMovie = ref(null)
let movies = ref([])
const emit = defineEmits(['updateMovie'])

onMounted(async () => {
  // Recuperar las peliculas desde la bd supabase
  const { data, error } = await supabase
    .from('movies')
    .select()
    .order('created_at')

  movies.value = data
})

const update = async (movie) => {
  // Actualizamos la película con sus nuevos datos a la bd
  const { data, error } = await supabase
    .from('movies')
    .update({ title: movie.title, year: movie.year, genre: movie.genre, synopsis: movie.synopsis, image: movie.image, updated_at: new Date() })
    .eq('id', movie.id)
    .select()

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha actualizado la siguiente movie -> ', data[0])

    let newMovie = data[0]
    newMovie.image = selectedMovie.value.image
    resetSelectedMovie()
    emit('updateMovie', newMovie)
  }
}

const resetSelectedMovie = () => {
  selectedMovie.value = null
}
</script>

<template>
<div class="flex flex-col gap-3">
      <h1 class="text-3xl">Editar o eliminar una película</h1>
      <div class="flex flex-col gap-3 max-w-screen-sm">
        <label for="selectedMovie">Selecciona una película</label>
        <select class="bg-slate-600 rounded px-2 py-1" name="selectedMovie" id="selectedMovie" v-model="selectedMovie">
          <option v-for="movie in movies" :key="movie.id" :value="movie">{{ `${movie.title}` }}</option>
        </select>
        <div class="flex flex-col gap-3" v-if="selectedMovie">
          <FormMovie v-model="selectedMovie" />
          <div class="flex gap-8 justify-center">
            <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3" @click="update(selectedMovie)">Actualizar</button>
            <DeleteMovie @deleteMovie="resetSelectedMovie" :selectedMovie="selectedMovie" />
          </div>
        </div>
      </div>
    </div>
</template>