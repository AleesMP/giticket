<script setup>
import logo from "../assets/logo.svg"
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
                        <a href="/" class="flex items-center space-x-2 py-5 px-2">
                            <img class="w-8 h-8 aspect-square" :src="logo" alt="Giticket Logo">
                            <span class="text-2xl font-extrabold text-white">GITICKET</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
