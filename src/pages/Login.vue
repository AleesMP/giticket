<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const props = defineProps(['store'])

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
        console.log(error)
    } else {
        router.replace('/admin')
        console.log('Se ha iniciado sesión -> ', data)
    }
}

watch(() => {
  if (props.store.currentUser) {
    router.replace('/')
  }
})
</script>

<template>
    <div>
        <div class="flex flex-col gap-4">
            <h2 class="text-white text-2xl">Login</h2>
            <div class="flex flex-col gap-2">
                <label class="text-white" for="email">Email</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="loginForm.email" name="email" type="email" required />
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-white" for="password">Password</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="loginForm.password" name="password" type="password" required />
            </div>
            <div class="flex gap-8 justify-center">
                <button class="px-4 py-2 rounded font-semibold bg-slate-800 text-white" type="button" @click="login">Entrar</button>
            </div>
        </div>
    </div>
</template>