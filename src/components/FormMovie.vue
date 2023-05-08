<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const movie = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
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
  </div>
</template>