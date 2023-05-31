<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['store'])

onMounted(() => {
  setTimeout(() => {
    if (!props.store.currentUser) {
      router.replace('/login')
    }
  }, 2000)
})
</script>

<template>
  <div v-if="props.store.currentUser" class="flex flex-col text-white p-8 gap-8">
    <div class="flex flex-col rounded bg-blue-500/60 p-4 gap-4">
      <span class="text-3xl">Peliculas</span>
      <div class="flex gap-2">
        <router-link :to="{ name: 'AdminMoviesCreate' }" class="w-1/3 max-w-xs flex flex-col items-center justify-center rounded gap-3 bg-blue-400/60 p-4 text-white hover:bg-blue-300/60">
          <font-awesome-icon :icon="['fas', 'circle-plus']" class="text-5xl" />
          <span class="font-bold">Dar de alta</span>
        </router-link>
        <router-link :to="{ name: 'AdminMoviesIndex' }" class="w-1/3 max-w-xs flex flex-col items-center justify-center rounded gap-3 bg-blue-400/60 p-4 text-white hover:bg-blue-300/60">
          <font-awesome-icon :icon="['fas', 'rectangle-list']" class="text-5xl" />
          <span class="font-bold">Listar</span>
        </router-link>
        <router-link :to="{ name: 'AdminMoviesUpdate' }" class="w-1/3 max-w-xs flex flex-col items-center justify-center rounded gap-3 bg-blue-400/60 p-4 text-white hover:bg-blue-300/60">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-5xl" />
          <span class="font-bold">Editar/Eliminar</span>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col rounded bg-blue-500/60 p-4 gap-4">
      <span class="text-3xl">Usuarios</span>
      <div class="flex gap-2">
        <router-link :to="{ name: 'AdminCreateUser' }" class="w-1/3 max-w-xs flex flex-col items-center justify-center rounded gap-3 bg-blue-400/60 p-4 text-white hover:bg-blue-300/60">
          <font-awesome-icon :icon="['fas', 'user-plus']" class="text-5xl" />
          <span class="font-bold">Registrar usuario</span>
        </router-link>
        <router-link :to="{ name: 'AdminBookingsIndex' }" class="w-1/3 max-w-xs flex flex-col items-center justify-center rounded gap-3 bg-blue-400/60 p-4 text-white hover:bg-blue-300/60">
          <font-awesome-icon :icon="['fas', 'receipt']" class="text-5xl" />
          <span class="font-bold">Reservas</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
