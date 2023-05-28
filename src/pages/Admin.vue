<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase'
import { useRouter } from 'vue-router'
import CreateMovie from '../components/CreateMovie.vue'
import ListMovies from '../components/ListMovies.vue'
import UpdateMovies from '../components/UpdateMovies.vue'

const router = useRouter()
const props = defineProps(['store'])

onMounted(() => {
  if (!props.store.currentUser) {
    router.replace('/login')
  }
})

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
  <div v-if="props.store.currentUser" class="flex flex-col gap-8 text-white p-4">
    <CreateMovie @createMovie="handleCreateMovie" />
    <ListMovies ref="listComponent"/>
    <UpdateMovies @updateMovie="handleUpdateMovie"/>
  </div>
</template>
