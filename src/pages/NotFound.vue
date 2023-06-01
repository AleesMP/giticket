<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
    router.push('/')
}
</script>
<template>
    <div class="flex flex-col gap-8 text-center text-white p-8">
        <h1 class="text-4xl">No se ha encontrado la página</h1>
        <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3 mx-auto" @click="goToHome">Volver al inicio</button>
    </div>
</template>
