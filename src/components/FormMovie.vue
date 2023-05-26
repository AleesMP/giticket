<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL

const movie = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const setImage = (event) => {
  movie.value.image = event.target.files[0] || null
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <label for="title">Título</label>
      <input class="bg-slate-600 rounded px-2 py-1" v-model="movie.title" name="title" type="text" required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="year">Año</label>
      <input class="bg-slate-600 rounded px-2 py-1" v-model="movie.year" name="year" type="number" required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="genre">Género</label>
      <input class="bg-slate-600 rounded px-2 py-1" v-model="movie.genre" name="genre" type="text" required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="synopsis">Sinopsis</label>
      <textarea class="bg-slate-600 rounded px-2 py-1" v-model="movie.synopsis" name="synopsis"></textarea>
    </div>
    <div class="flex flex-col gap-2">
      <label for="released_at">Fecha de lanzamiento</label>
      <input class="bg-slate-600 rounded px-2 py-1" v-model="movie.released_at" name="released_at" type="datetime-local" required />
    </div>
    <div class="flex flex-col gap-2">
      <label for="ended_at">Fecha de retiro</label>
      <input class="bg-slate-600 rounded px-2 py-1" v-model="movie.ended_at" name="ended_at" type="datetime-local" />
    </div>
    <div class="flex flex-col gap-2">
      <label for="image">Imagen</label>
      <input class="bg-slate-600 rounded px-2 py-1" @change="setImage" name="image" type="file" accept="image/png, image/jpeg" required />
      <img v-if="typeof movie.image === 'string'" class="object-cover h-96 w-64" :src="supabaseStorageUrl + movie.image" :alt="'Portada de: ' + movie.title">
    </div>
  </div>
</template>