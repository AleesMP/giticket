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
  <nav class="bg-blue-800 max-w-auto max-h-auto mx-auto px-5 md:px-8">
    <div class="flex justify-between">
      <div class="flex space-x-4">
        <a href="/" class="flex items-center space-x-2 py-5">
          <img class="w-8 h-8 aspect-square" :src="logo" alt="Giticket Logo">
          <span class="text-2xl font-extrabold text-amber-400">Giticket</span>
        </a>
      </div>
      <div v-if="props.store.currentUser" class="flex items-center">
        <div class="flex items-center gap-2 md:gap-4">
          <router-link :to="{ name: 'AdminIndex' }" class="flex flex-col text-white rounded p-3">
            <span class="text-center font-bold text-amber-400 hidden md:block">{{ props.store.currentUser.user_metadata.name }}</span>
            <span class="text-sm hidden md:block">{{ props.store.currentUser.email }}</span>
            <font-awesome-icon :icon="['fas', 'user-gear']" class="md:hidden" />
          </router-link>
          
          <button class="text-sm px-2 py-1 rounded font-semibold bg-orange-400 rounded text-white hover:bg-orange-300 md:text-base md:w-32 md:h-12" type="button" @click="logout">Desconectar</button>
        </div>
      </div>
    </div>
  </nav>
</template>
