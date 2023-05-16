<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

import CreateMovie from '../components/CreateMovie.vue'
import ListMovies from '../components/ListMovies.vue'
import UpdateMovies from '../components/UpdateMovies.vue'

const handleCreateMovie = (data) => {
  storeImage(data)
  listComponent.value.fetchMovies()
}

const handleUpdateMovie = (data) => {
  if (typeof data.image !== 'string') {
    storeImage(data)
  }

  listComponent.value.refreshMovie(data)
}

const listComponent = ref(null)

const storeImage = async (movie) => {
  const imageName = generateImageName()

  const { data, error } = await supabase.storage
    .from('covers')
    .upload(`public/${imageName}`, movie.image)

    if (error) {
      console.log(error)
    } else {
      updateMovieImageUrl(imageName, movie.id)
    }
}

const updateMovieImageUrl = async (name, id) => {
  const { data, error } = await supabase
    .from('movies')
    .update({ image: name, updated_at: new Date() })
    .eq('id', id)
    .select()

    if (error) {
      console.log(error)
    } else {
      console.log('Se ha guardado la imagen de la movie -> ', data)
    }
}

const generateImageName = () => {
  const numberOfChars = 40
  return [...Array(numberOfChars)].map(() => Math.random().toString(36)[2]).join('')
}
</script>

<template>
  <div class="flex flex-col gap-8 text-white p-4">
    <CreateMovie @createMovie="handleCreateMovie" />
    <ListMovies ref="listComponent"/>
    <UpdateMovies @updateMovie="handleUpdateMovie"/>
  </div>
</template>
