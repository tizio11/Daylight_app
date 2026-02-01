<script setup lang="ts">
import {ref} from 'vue';
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

  const cards = [];

  for(let i=0; i<12; i++){
    const tempMonth = start.plus({months:i}); //aggiungo i al mese per ogni iterazione a partire da start
    const dateWithStyle=tempMonth.setLocale('it').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY).split(',',1); //formattazione come voglio io

    const newCard ={
      id:i,
      date:dateWithStyle.toString(),
      picture:`/pictures/foto${i+1}.jpg`
    }

    cards.push(newCard);
  }

  return cards;
}

const dateList = ref<any[]>([]);

dateList.value=generate12Months();
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

      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="item in dateList">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="item.picture" alt="Card image cap">
            <div class="card-body" >
              <h5 class="card-title">{{item.date}}</h5>
              <p></p>
              <a href="#" class="btn btn-primary">Guarda la Daylight duration</a>
            </div>
          </div>
        </div>
      </div>
      

      
    </div>
</template>

<style src="./Home.css"></style>