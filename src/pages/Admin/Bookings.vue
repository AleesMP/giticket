<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ListBookings from '../../components/ListBookings.vue';

const router = useRouter()
const props = defineProps(['store'])

onMounted(() => {
  setTimeout(() => {
    if (!props.store.currentUser) {
      router.replace('/login')
    }
  }, 2000)
})

</script>

<template>
  <div v-if="props.store.currentUser" class="flex flex-col gap-8 text-white p-4">
    <ListBookings />
  </div>
</template>
