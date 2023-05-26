<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'
import Navbar from './components/Navbar.vue';

onMounted(async () => {
  // Escuchamos el evento authStateChange y reaccionamos a los que nos interesan
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT') {
      router.replace({ path: '/' })
    }

    if (event == 'SIGNED_IN') {
      router.replace({ path: '/admin' })
    }
  })
})
</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>