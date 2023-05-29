import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const storeImage = async (movie) => {
    const imageName = generateImageName()

    const { data, error } = await supabase.storage
        .from('covers')
        .upload(`public/${imageName}`, movie.image)

    if (error) {
        console.log(error)
    } else {
        updateMovieImageUrl(imageName, movie.id)
    }
}

const generateImageName = () => {
    const numberOfChars = 40
    return [...Array(numberOfChars)].map(() => Math.random().toString(36)[2]).join('')
}

const updateMovieImageUrl = async (name, id) => {
    const { data, error } = await supabase
        .from('movies')
        .update({ image: name, updated_at: new Date() })
        .eq('id', id)
        .select()

    if (error) {
        console.log(error)
    } else {
        console.log('Se ha guardado la imagen de la movie -> ', data)
    }
}

export { supabase, storeImage }