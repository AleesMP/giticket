<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'
import Navbar from './components/Navbar.vue';

const store = ref({
  currentUser: null
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()

  store.value.currentUser = user

  // Escuchamos el evento authStateChange y reaccionamos a los que nos interesan
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
      store.value.currentUser = session.user
    }

    if (event == 'SIGNED_OUT') {
      store.value.currentUser = null

      router.replace({ path: '/' })
    }
  })
})
</script>

<template>
  <div>
    <Navbar v-model:store="store" />
    <router-view v-model:store="store" />
  </div>
</template>