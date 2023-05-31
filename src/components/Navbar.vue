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
            <div class="flex items-center gap-4">
              <router-link :to="{ name: 'AdminIndex' }" class="flex flex-col text-white rounded p-3">
                <span class="text-center font-bold text-amber-400">{{ props.store.currentUser.user_metadata.name }}</span>
                <span class="text-sm">{{ props.store.currentUser.email }}</span>
              </router-link>
              
              <button class="h-12 rounded font-semibold bg-orange-400 w-32 rounded text-white hover:bg-orange-500"
                type="button" @click="logout">Desconectar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
