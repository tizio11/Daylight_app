<script setup lang="ts">
import {ref, computed} from 'vue';

const latitude = ref<number|null>(null);
const longitude = ref<number|null>(null);
const errorMsg = ref<string>('');


function getLocation() {
  errorMsg.value='';  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    errorMsg.value = "La Geolocalizzazione non è supportata da questo browser.";
  }
}

function success(position: GeolocationPosition) {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
}

function error(err: GeolocationPositionError) {
  console.error(err);
  errorMsg.value = "Impossibile ottenere la tua posizione. Assicurati di aver dato i permessi.";
}
</script>

<template>
    <div class="containerHome">
        <div class="containerPos">
            
            <button @click="getLocation">Trova Posizione</button>

            <div v-if="latitude && longitude" class="results">
                <p><strong>Latitudine:</strong> {{ latitude }}</p>
                <p><strong>Longitudine:</strong> {{ longitude }}</p>
            </div>

            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        </div>
    </div>
</template>

<style src="./Home.css"></style>