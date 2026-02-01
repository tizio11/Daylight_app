<script setup lang="ts">

</script>

<template>
    <div class="app-container">
        <header>
            <h1> Benvenuto nella Daylight App! </h1>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">Info</router-link>
            </nav>
        </header>
        <main>
            <router-view/>
        </main>
        <footer>
            <p>&copy; TizioCore</p>
        </footer>
    </div>
</template>

<style src="./App.css"></style>