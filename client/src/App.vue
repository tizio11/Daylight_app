<script setup lang="ts">

</script>

<template>
    <div class="app-container">
        <header>
            <h1> Welcome to the Daylight App! </h1>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
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