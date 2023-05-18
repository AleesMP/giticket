<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
    router.push('/')
}
</script>
<template>
    <div class="text-white">
        <h1 class="text-4xl">No se ha encontrado la página</h1>
        <h2 class="text-2xl">Error 404</h2>
        <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3 mx-auto" @click="goToHome">Volver a la home</button>
    </div>
</template>
