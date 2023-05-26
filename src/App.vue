<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'
import Navbar from './components/Navbar.vue';

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
  <div>
    <Navbar />
    <router-view :currentUser="currentUser" />
  </div>
</template>