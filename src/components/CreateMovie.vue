<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'
import FormMovie from './FormMovie.vue'

const emit = defineEmits(['createMovie'])

let movie = ref({
    title : '',
    year : null,
    genre : '',
    synopsis : null,
    image : null,
    slug: ''
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
      console.log('Se ha creado la siguiente movie -> ', data[0])

      let newMovie = data[0]
      newMovie.image = movie.value.image
      newMovie.slug = generateAndSaveSlug(newMovie)

      emit('createMovie', newMovie)
    }
  }

const generateAndSaveSlug = async (movie) => {
  let slug = slugify(movie.title)
  const isAvailable = await checkIfSlugIsAvailable(slug)

  if (!isAvailable) {
    slug = await regenerateSlug(slug)
  }

  const { error } = await supabase
    .from('movies')
    .update({ slug: slug, updated_at: new Date() })
    .eq('id', movie.id)

  if (error) {
    console.log(error)
  } else {
    return slug
  }
}

const regenerateSlug = async (slug, index = 2) => {
  const splitSlug = slug.split('-')
  const parsedLastItem = parseInt(splitSlug[splitSlug.length - 1])
  
  // Mirar si el último item del slug es un número
  if (!isNaN(parsedLastItem)) {
    index = parsedLastItem + 1
    let popped = splitSlug.pop()
  }
  
  const newSlug = slugify(splitSlug.join('-') + '-' + index)

  const isAvailable = await checkIfSlugIsAvailable(newSlug)

  if (isAvailable) {
    return newSlug
  }

  return regenerateSlug(newSlug, index)
}

const checkIfSlugIsAvailable = async (slug) => {
  const { data, error } = await supabase
    .from('movies')
    .select('slug')
    .eq('slug', slug)

  if (error) {
    console.log(error)
  } else {
    return !data.length
  }
}

const slugify = (text) => {
  return text
    .toString()                   // Cast to string (optional)
    .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase()                // Convert the string to lowercase letters
    .trim()                       // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\_/g,'-')           // Replace _ with -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/\-$/g, '');         // Remove trailing -
}
</script>

<template>
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">Formulario</h1>
      <FormMovie v-model="movie" />
      <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3 mx-auto" @click="submit">Enviar</button>
    </div>
</template>