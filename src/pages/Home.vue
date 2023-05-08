<script setup>
import { supabase } from '../services/supabase'

const props = defineProps({
  currentUser: Object
})

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
    <h1 class="text-3xl text-white">Home</h1>
    <div v-if="currentUser">
        <div>
            Bienvenido/a {{ currentUser.user_metadata.name }}
        </div>
        <button type="button" @click="logout">Logout</button>
    </div>
</template>