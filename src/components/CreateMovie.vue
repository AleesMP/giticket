<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'
import FormMovie from './FormMovie.vue'

let movie = ref({
    title : '',
    year : null,
    genre : '',
    synopsis : null
})

const submit = async () => {
    // Enviar los datos a nuestra base de datos (supabase)
    const { data, error } = await supabase
      .from('movies')
      .insert({ title: movie.value.title, year: movie.value.year, genre: movie.value.genre, synopsis: movie.value.synopsis })
      .select()
  
    if (error) {
      console.log(error)
    } else {
      console.log('Se ha creado la siguiente movie -> ', data)
    }
  }
</script>

<template>
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">Formulario</h1>
      <FormMovie v-model="movie" />
      <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3 mx-auto" @click="submit">Enviar</button>
    </div>
</template>