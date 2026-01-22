<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from './services/supabase'
import router from './router'
import Navbar from './components/Navbar.vue'

const store = ref({
  currentUser: null
})

const error = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // 5s de espera máx.

    const { data, error: supaError } = await supabase.auth.getUser({ signal: controller.signal })
    clearTimeout(timeout)

    if (supaError || !data?.user) {
      // Si no hay usuario o hay error, mostrar mensaje
      console.warn('No se pudo conectar con Supabase:', supaError)
      error.value = true
    } else {
      store.value.currentUser = data.user
    }

    // Escuchamos cambios de autenticación
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') store.value.currentUser = session.user
      if (event === 'SIGNED_OUT') {
        store.value.currentUser = null
        router.replace({ path: '/' })
      }
    })
  } catch (err) {
    console.error('Error grave al conectar con Supabase:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <Navbar v-model:store="store" />

    <div v-if="loading" class="status-message">
      <p>Cargando...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <h2>🚧 Problemas técnicos 🚧</h2>
      <p>La base de datos está temporalmente inactiva</p>
    </div>

    <router-view v-else v-model:store="store" />
  </div>
</template>

<style>
.status-message, .error-message {
  text-align: center;
  margin-top: 30vh;
  font-family: system-ui, sans-serif;
  color: #555;
}
.error-message h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}
</style>
