<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

const route = useRoute()
const router = useRouter()

const movie = ref()

onMounted(async () => {
    await fetchMovieBySlug(route.params.movieSlug)
})

const fetchMovieBySlug = async (slug) => {
    const { data, error } = await supabase
        .from('movies')
        .select()
        .eq('slug', slug)

    if (error) {
        console.log(error)
    } else {
        if (data.length) {
            movie.value = data[0]
        } else {
            router.push('/404')
        }
    }
}

const goBack = () => {
    router.push('/')
}
</script>
<template>
    <div v-if="movie" class="flex flex-col gap-4 text-white">
        <div class="text-4xl">{{ movie.title }}</div>
        <img class="w-64" :src="supabaseStorageUrl + movie.image" :alt="`${movie.title} - Imagen`">

        <div class="flex gap-4">
            <button class="px-4 py-2 rounded font-semibold bg-slate-600 w-1/3" @click="goBack">Ir atras</button>
            <button class="px-4 py-2 rounded font-semibold bg-slate-800 w-1/3">Reservar</button>
        </div>
    </div>
</template>
