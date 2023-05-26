<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase'
import { useRouter } from 'vue-router'
import CreateMovie from '../components/CreateMovie.vue'
import ListMovies from '../components/ListMovies.vue'
import UpdateMovies from '../components/UpdateMovies.vue'

const router = useRouter()

let currentUser = ref()

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()

  currentUser.value = user

  if (!currentUser.value) {
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

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
  } else {
    currentUser.value = null
    console.log('Se ha cerrado la sesión')
  }
}

</script>

<template>
  <div class="flex flex-col gap-8 text-white p-4">
    <div v-if="currentUser" class="flex justify-between gap-4">
      <div>
        Bienvenido/a {{ currentUser.user_metadata.name }}
      </div>

      <button class="px-4 py-2 rounded font-semibold bg-orange-800 w-1/5" type="button" @click="logout">Logout</button>
    </div>
    <CreateMovie @createMovie="handleCreateMovie" />
    <ListMovies ref="listComponent"/>
    <UpdateMovies @updateMovie="handleUpdateMovie"/>
  </div>
</template>
