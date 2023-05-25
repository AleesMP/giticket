<script setup>
import { ref } from 'vue';

const mobileMenu = ref(true);

</script>

<template>
    <nav>
        <!-- desktop menu -->
        <div class="bg-blue-600">
            <div class="max-w-auto mx-auto">
                <div class="flex justify-between">
                    <!-- menu -->
                    <div class="flex space-x-4">
                        <!-- logo -->
                        <a href="" class="flex items-center space-x-2 py-5 px-2">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z">
                                </path>
                            </svg>
                            <span class="text-2xl font-extrabold text-white">CINEMA</span>
                        </a>
                    </div>
                    <!-- login -->
                    <div class="hidden md:flex items-center space-x-2">
                        <a href="/" class="py-5 px-2 text-white bg-cyan-400 hover:bg-cyan-500 rounded-md">Iniciar sesión</a>
                        <!-- <a href="/" class="py-5 px-2 text-white bg-cyan-400 hover:bg-cyan-500 rounded-md">Registrarse</a> -->
                    </div>
                    <!-- button show mobile menu -->
                    <div @click="mobileMenu = !mobileMenu" class="md:hidden flex items-center">
                        <button class="py-5 px-2">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- mobile menu-->
        <div class="md:hidden bg-blue-600" :class="{ hidden:mobileMenu }">
            <a href="/" class="block py-2 px-4 hover:text-blue-300">Iniciar sesión</a>
            <a href="/" class="block py-2 px-4 hover:text-blue-300">Registrarse</a>
        </div>
    </nav>
</template>