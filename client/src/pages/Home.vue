<script setup lang="ts">
import {ref, computed} from 'vue';
import {DateTime} from 'luxon';

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

const generate12Months = () => {
  const start = DateTime.now().set({month:1}); //ora e giorno correnti a partire da Gennaio dell'anno corrente

  const dates = [];

  for(let i=0; i<12; i++){
    const futureMonth = start.plus({months:i}); //aggiungo i al mese per ogni iterazione a partire da start
    const dateWithStyle=futureMonth.setLocale('it').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY); //formattazione come voglio io
    dates.push(dateWithStyle.toString());
  }

  return dates;
}

const dateList = ref<string[]>([]);

dateList.value=generate12Months();
</script>

<template>
    <div class="containerHome">
        <div class="containerPos">
            
            <button @click="getLocation">Trova Posizione</button>

            <div v-if="latitude && longitude" class="results">
                <p><strong>Latitudine:</strong> {{ latitude }}</p>
                <p><strong>Longitudine:</strong> {{ longitude }}</p>
                <ul>
                  <li v-for="month in dateList":key="month">
                    {{ month }}
                  </li>
                </ul>
            </div>

            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        </div>
    </div>
</template>

<style src="./Home.css"></style>