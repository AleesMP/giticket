<script setup>
import { supabase } from '../services/supabase'
import { useToast } from 'vue-toastification'

const toast = useToast()

const props = defineProps({
  selectedMovie: Object
})

// evento personalizado
const emit = defineEmits(['deleteMovie'])
const deleteMovieById = async (id) => {
    // Eliminamos la película de la bd
    const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id)

    if (error) {
        toast.error('Error al eliminar la película')
    } else {
        toast.success('Se ha eliminado la película correctamente')
        emit('deleteMovie')
    }
}
</script>

<template>
    <button class="px-4 py-2 rounded font-semibold bg-red-800 w-1/3" @click="deleteMovieById(selectedMovie.id)">Eliminar</button>
</template>