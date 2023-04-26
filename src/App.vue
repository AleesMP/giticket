<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'

let titulo = ref('')
let anio = ref()
let genero = ref('')
let sinopsis = ref(null)
let selectedMovie = ref(null)

let movies = ref([])
onMounted(async () => {
  // Recuperar las peliculas desde la bd supabase
  const { data, error } = await supabase
    .from('movies')
    .select()

  movies.value = data
})

const submit = async () => {
  // Podemos validar los datos de una forma más compleja (opcional)

  // Enviar los datos a nuestra base de datos (supabase)
  const { data, error } = await supabase
    .from('movies')
    .insert({ title: titulo.value, year: anio.value, genre: genero.value, synopsis: sinopsis.value })
    .select()

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha creado la siguiente movie -> ', data)
  }
}

const update = async (movie) => {

  // Actualizamos la película con sus nuevos datos a la bd
  const { data, error } = await supabase
    .from('movies')
    .update({ title: movie.title, year: movie.year, genre: movie.genre, synopsis: movie.synopsis })
    .eq('id', movie.id)
    .select()

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha actualizado la siguiente movie -> ', data)
    selectedMovie.value = null
  }
}

const deleteMovieById = async (id) => {

  // Eliminamos la película de la bd
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha eliminado la movie')
    selectedMovie.value = null
  }
}

</script>

<template>
  <div class="flex flex-col gap-8 text-white p-4">
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">Formulario</h1>
      <div class="flex flex-col gap-2">
        <label for="titulo">Título</label>
        <input class="bg-slate-600 rounded px-2 py-1" v-model="titulo" name="titulo" type="text" required/>
      </div>
      <div class="flex flex-col gap-2">
        <label for="anio">Año</label>
        <input class="bg-slate-600 rounded px-2 py-1" v-model="anio" name="anio" type="number" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="genero">Género</label>
        <input class="bg-slate-600 rounded px-2 py-1" v-model="genero" name="genero" type="text" required />
      </div>
      <div class="flex flex-col gap-2">
        <label for="sinopsis">Sinopsis</label>
        <textarea class="bg-slate-600 rounded px-2 py-1" v-model="sinopsis" name="sinopsis"></textarea>
      </div>
      <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3 mx-auto" @click="submit">Enviar</button>
    </div>
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">Listado</h1>
      <table class="border-collapse table-auto" v-if="movies">
        <thead>
          <tr>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">UUID</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Title</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Year</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Genre</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Synopsis</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Created_at</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Updated_at</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800">
          <tr v-for="movie in movies" :key="movie.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.id }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.title }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.year }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.genre }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.synopsis }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.created_at }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>No hay ninguna película.</div>
    </div>
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">Editar o eliminar una película</h1>
      <div class="flex flex-col gap-3">
        <label for="selectedMovie">Selecciona una película</label>
        <select class="bg-slate-600 rounded px-2 py-1" name="selectedMovie" id="selectedMovie" v-model="selectedMovie">
          <option v-for="movie in movies" :key="movie.id" :value="movie">{{ `${movie.title} (${movie.id})` }}</option>
        </select>
        <div class="flex flex-col gap-3" v-if="selectedMovie">
          <div class="flex flex-col gap-2">
            <label for="selectedMovieTitle">Título</label>
            <input class="bg-slate-600 rounded px-2 py-1" v-model="selectedMovie.title" name="selectedMovieTitle" type="text" required/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="selectedMovieYear">Año</label>
            <input class="bg-slate-600 rounded px-2 py-1" v-model="selectedMovie.year" name="selectedMovieYear" type="number" required />
          </div>
          <div class="flex flex-col gap-2">
            <label for="selectedMovieGenre">Género</label>
            <input class="bg-slate-600 rounded px-2 py-1" v-model="selectedMovie.genre" name="selectedMovieGenre" type="text" required />
          </div>
          <div class="flex flex-col gap-2">
            <label for="selectedMovieSynopsis">Sinopsis</label>
            <textarea class="bg-slate-600 rounded px-2 py-1" v-model="selectedMovie.synopsis" name="selectedMovieSynopsis"></textarea>
          </div>
          <div class="flex gap-8 justify-center">
            <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3" @click="update(selectedMovie)">Actualizar</button>
            <button class="px-4 py-2 rounded font-semibold bg-red-800 w-1/3" @click="deleteMovieById(selectedMovie.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
