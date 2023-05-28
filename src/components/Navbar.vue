<script setup>
import logo from "../assets/logo.svg"
import { supabase } from '../services/supabase'

const props = defineProps(['store'])

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
  } else {
    console.log('Se ha cerrado la sesión')
  }
}
</script>

<template>
  <nav>
    <div class="bg-blue-800">
      <div class="max-w-auto max-h-auto mx-auto px-8">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <a href="/" class="flex items-center space-x-2 py-5">
              <img class="w-8 h-8 aspect-square" :src="logo" alt="Giticket Logo">
              <span class="text-2xl font-extrabold text-amber-400">Giticket</span>
            </a>
          </div>
          <div v-if="props.store.currentUser" class="flex items-center">
            <div class="flex flex-wrap p-4">
              <div class="flex justify-between p-2 bg-blue-400 px-2 rounded font-bold">
                <div>Peliculas
                  <a href="/" class="px-2 text-white">Dar de alta</a>
                  <a href="/" class="px-2 text-white">Listar</a>
                  <a href="/" class="px-2 text-white">Editar/Eliminar</a>
                </div>
                <div>Usuarios
                  <a href="/" class="px-2 text-white">Registrar usuario</a>
                  <a href="/" class="px-2 text-white">Reservas</a>
                </div>
              </div>
            </div>
            <div>
              <!-- /admin temporal para poder ir rápido -->
              <a href="/admin" class="text-white bg-orange-300 rounded p-3">{{ `${props.store.currentUser.user_metadata.name} (${props.store.currentUser.email})` }}</a>
              <button class="h-12 rounded font-semibold bg-orange-400 w-32 rounded text-white hover:bg-orange-500"
                type="button" @click="logout">Desconectar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
