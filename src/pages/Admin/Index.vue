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
    <div v-if="props.store.currentUser" class="flex items-center">
        <div class="flex flex-wrap p-4">
            <div class="flex justify-between p-2 bg-blue-400 px-2 rounded font-bold">
            <div>
                <span>Peliculas</span>
                <router-link :to="{ name: 'AdminMoviesCreate' }" class="px-2 text-white">Dar de alta</router-link>
                <router-link :to="{ name: 'AdminMoviesIndex' }" class="px-2 text-white">Listar</router-link>
                <router-link :to="{ name: 'AdminMoviesUpdate' }" class="px-2 text-white">Editar/Eliminar</router-link>
            </div>
            <div>
                <span>Usuarios</span>
                <router-link :to="{ name: 'AdminCreateUser' }" class="px-2 text-white">Registrar usuario</router-link>
                <router-link :to="{ name: 'AdminBookingsIndex' }" class="px-2 text-white">Reservas</router-link>
            </div>
            </div>
        </div>
    </div>
</template>
