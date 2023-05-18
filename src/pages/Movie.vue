<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

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
</script>
<template>
    <div v-if="movie">
        <div>{{ movie.title }}</div>
    </div>
</template>
