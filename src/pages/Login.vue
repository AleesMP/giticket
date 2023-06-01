<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'
import { useToast } from 'vue-toastification'

const router = useRouter()
const props = defineProps(['store'])
const toast = useToast()

const loginForm = ref({
    email: '',
    password: '',
})

const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.value.email,
        password: loginForm.value.password,
    })

    if (error) {
        toast.error('El email o contraseña son incorrectos')
    } else {
        toast.success('¡Bienvenido/a ' + data.user.user_metadata.name + '!')
        router.replace('/admin')
    }
}

watch(() => {
  if (props.store.currentUser) {
    router.replace('/')
  }
})

</script>

<template>
    <div class="flex flex-col gap-4 px-4 py-8 max-w-screen-sm mx-auto">
        <h2 class="text-white text-2xl">Login</h2>
        <div class="flex flex-col gap-2">
            <label class="text-white" for="email">Email</label>
            <input class="bg-slate-600 rounded px-2 py-1" v-model="loginForm.email" name="email" type="email" @input="resetErrors" required />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-white" for="password">Password</label>
            <input class="bg-slate-600 rounded px-2 py-1" v-model="loginForm.password" name="password" type="password" @input="resetErrors" required />
        </div>
        <div class="flex gap-8 justify-center">
            <button class="px-4 py-2 rounded font-semibold bg-slate-800 text-white" type="button" @click="login">Entrar</button>
        </div>
    </div>
</template>