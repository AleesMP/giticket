<script setup>
import logo from "../assets/logo.svg"
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

let currentUser = ref()

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
  } else {
    currentUser.value = null
    console.log('Se ha cerrado la sesión')
  }
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()

  currentUser.value = user
})

</script>

<template>
    <nav>
        <!-- desktop menu -->
        <div class="bg-blue-600">
            <div class="max-w-auto mx-auto px-8">
                <div class="flex justify-between">
                    <!-- menu -->
                    <div class="flex space-x-4">
                        <!-- logo -->
                        <a href="/" class="flex items-center space-x-2 py-5">
                            <img class="w-8 h-8 aspect-square" :src="logo" alt="Giticket Logo">
                            <span class="text-2xl font-extrabold text-white">GITICKET</span>
                        </a>
                    </div>
                    <div v-if="currentUser" class="flex items-center gap-10">
                        <div class="text-white">{{ `${currentUser.user_metadata.name} (${currentUser.email})` }}</div>
                        <button class="h-12 rounded font-semibold bg-orange-400 w-32 rounded text-white hover:bg-orange-300" type="button" @click="logout">Desconectar</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
