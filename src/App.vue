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
  <div>
    <div>
      <h1>Formulario</h1>
      <div>
        <label for="titulo">Título</label>
        <input v-model="titulo" name="titulo" type="text" required/>
      </div>
      <div>
        <label for="anio">Año</label>
        <input v-model="anio" name="anio" type="number" required />
      </div>
      <div>
        <label for="genero">Género</label>
        <input v-model="genero" name="genero" type="text" required />
      </div>
      <div>
        <label for="sinopsis">Sinopsis</label>
        <textarea v-model="sinopsis" name="sinopsis"></textarea>
      </div>
      <button @click="submit">Enviar</button>
    </div>
    <div>
      <h1>Listado</h1>
      <table v-if="movies">
        <tr>
          <th>UUID</th>
          <th>Title</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Synopsis</th>
          <th>Created_at</th>
          <th>Updated_at</th>
        </tr>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.id }}</td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.synopsis }}</td>
          <td>{{ movie.created_at }}</td>
          <td>{{ movie.updated_at }}</td>
        </tr>
      </table>
      <div v-else>No hay ninguna película.</div>
    </div>
    <div>
      <h1>Editar o eliminar una pelicula</h1>
      <div>
        <label for="selectedMovie">Selecciona una película</label>
        <select name="selectedMovie" id="selectedMovie" v-model="selectedMovie">
          <option v-for="movie in movies" :key="movie.id" :value="movie">{{ `${movie.title} (${movie.id})` }}</option>
        </select>
        <div v-if="selectedMovie">
          <div>
            <label for="selectedMovieTitle">Título</label>
            <input v-model="selectedMovie.title" name="selectedMovieTitle" type="text" required/>
          </div>
          <div>
            <label for="selectedMovieYear">Año</label>
            <input v-model="selectedMovie.year" name="selectedMovieYear" type="number" required />
          </div>
          <div>
            <label for="selectedMovieGenre">Género</label>
            <input v-model="selectedMovie.genre" name="selectedMovieGenre" type="text" required />
          </div>
          <div>
            <label for="selectedMovieSynopsis">Sinopsis</label>
            <textarea v-model="selectedMovie.synopsis" name="selectedMovieSynopsis"></textarea>
          </div>
          <button @click="update(selectedMovie)">Actualizar</button>
          <button @click="deleteMovieById(selectedMovie.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
