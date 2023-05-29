<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeImage } from '../../../services/supabase'
import UpdateMovies from '../../../components/UpdateMovies.vue'

const router = useRouter()
const props = defineProps(['store'])

onMounted(() => {
    setTimeout(() => {
        if (!props.store.currentUser) {
            router.replace('/login')
        }
    }, 2000)
})

const handleUpdateMovie = (data) => {
  if (typeof data.image !== 'string') {
    storeImage(data)
  }
}
</script>
<template>
    <div v-if="props.store.currentUser" class="flex flex-col gap-8 text-white p-4">
        <UpdateMovies @updateMovie="handleUpdateMovie"/>
    </div>
</template>