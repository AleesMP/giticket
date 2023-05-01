<script setup>
import { supabase } from '../services/supabase'

const props = defineProps({
  selectedMovie: Object
})

const emit = defineEmits(['deleteMovie'])

const deleteMovieById = async (id) => {
    // Eliminamos la película de la bd
    const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
    } else {
        console.log('Se ha eliminado la movie')
        emit('deleteMovie')
    }
}
</script>

<template>
    <button class="px-4 py-2 rounded font-semibold bg-red-800 w-1/3" @click="deleteMovieById(selectedMovie.id)">Eliminar</button>
</template>