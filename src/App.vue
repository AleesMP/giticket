<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'

const currentUser = ref()

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  // Escuchamos el evento authStateChange y reaccionamos a los que nos interesan
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT') {
      currentUser.value = null
      router.replace({ path: '/' })
    }

    if (event == 'SIGNED_IN') {
      currentUser.value = session.user
      router.replace({ path: '/' })
    }
  })
})
</script>

<template>
  <nav class="flex gap-4 text-white">
    <router-link to="/">Home</router-link>
    <router-link v-if="currentUser" to="/admin">Admin</router-link>
    <router-link v-else to="/login">Registrarse / Iniciar sesión</router-link>
  </nav>
  <router-view :currentUser="currentUser" />
</template>