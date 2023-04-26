<script setup>
import { ref } from 'vue'
import { supabase } from './services/supabase'

let titulo = ref('')
let anio = ref()
let genero = ref('')
let sinopsis = ref(null)

const submit = async () => {
  // Podemos validar los datos de una forma más compleja (opcional)

  // Enviar los datos a nuestra base de datos (supabase)
  const { data, error } = await supabase
    .from('movies')
    .insert({ title: titulo.value, year: anio.value, genre: genero.value, synopsis: sinopsis.value })
    .select()

  if (error) {
    console.log(error)
  }
  
  console.log('Se ha creado la siguiente movie -> ', data)
}
</script>

<template>
  <div>
    <h1>Formulario</h1>
    <div>
      <label for="titulo">Título</label>
      <input v-model="titulo" name="titulo" type="text" required/>
    </div>
    <div>
      <label for="anio">Año</label>
      <input v-model="anio" name="anio" type="number" required />
    </div>
    <div>
      <label for="genero">Género</label>
      <input v-model="genero" name="genero" type="text" required />
    </div>
    <div>
      <label for="sinopsis">Sinopsis</label>
      <textarea v-model="sinopsis" name="sinopsis"></textarea>
    </div>
    <button @click="submit">Enviar</button>
  </div>
</template>

<style scoped></style>
