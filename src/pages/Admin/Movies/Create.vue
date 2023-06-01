<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeImage } from '../../../services/supabase'
import CreateMovie from '../../../components/CreateMovie.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()
const props = defineProps(['store'])

onMounted(() => {
    setTimeout(() => {
        if (!props.store.currentUser) {
            router.replace('/login')
        }
    }, 2000)
})

const handleCreateMovie = (data) => {
    toast.success('Se ha creado la película "' + data.title + '" correctamente')
    storeImage(data)
}
</script>
<template>
    <div v-if="props.store.currentUser" class="flex flex-col gap-8 text-white p-4">
        <CreateMovie @createMovie="handleCreateMovie" />
    </div>
</template>