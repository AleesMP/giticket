<script setup>
import { ref } from 'vue'
import { supabase } from '../services/supabase'

const newUser = ref({
    name: '',
    email: '',
    password: '',
})

const registerUser = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: newUser.value.email,
        password: newUser.value.password,
        options: {
            data: {
                name: newUser.value.name,
            }
        }
    })
    if (error) {
        console.log(error)
    } else {
        console.log('Se ha registrado el usuario -> ', data)
    }
}

</script>

<template>
    <div class="flex flex-col gap-4">
            <h2 class="text-white text-2xl">Registrar usuario</h2>
            <div class="flex flex-col gap-2">
                <label class="text-white" for="name">Nombre</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="newUser.name" name="name" type="text" required />
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-white" for="email">Email</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="newUser.email" name="email" type="email" required />
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-white" for="password">Password</label>
                <input class="bg-slate-600 rounded px-2 py-1" v-model="newUser.password" name="password" type="password" required />
            </div>
            <div class="flex gap-8 justify-center">
                <button class="px-4 py-2 rounded font-semibold bg-slate-800 text-white" type="button" @click="registerUser">Registrar</button>
            </div>
        </div>
</template>