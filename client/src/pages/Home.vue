<script setup lang="ts">
import {ref} from 'vue';
import {DateTime} from 'luxon';
import {getDayLight} from '../API';

const latitude = ref<number|null>(null);
const longitude = ref<number|null>(null);
const errorMsg = ref<string>('');


function getLocation() {
  errorMsg.value='';  
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(success, error,options);
  } else {
    errorMsg.value = "La Geolocalizzazione non è supportata da questo browser.";
  }
}

function success(position: GeolocationPosition) {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;

  dayLightForCards();
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
      rawDate: tempMonth.toISODate(),
      daylight: 'Ho bisogno di conoscere la tua posizione prima..',
      picture:`/pictures/foto${i+1}.jpg`,
      showcard: false
    }

    cards.push(newCard);
  }

  return cards;
}

const dateList = ref<any[]>([]);

dateList.value=generate12Months();

const dayLightForCards = async () => {
  if (!latitude.value || !longitude.value) return;
  const promises = dateList.value.map( async (day) => {
    const data = await getDayLight(latitude.value!, longitude.value!, day.rawDate);

    if(data && data.results){
      day.daylight=data.results.day_length;
    }
    else{
      day.daylight="N/D";
    }
  });
  await Promise.all(promises);
}

const showPosition = ref(false);
const toggleLocation = () => {
  if (!showPosition.value && !latitude.value) {
    getLocation();
  }

  showPosition.value = !showPosition.value;
}

</script>

<template>
    <div class="containerHome">

      <div class="containerPos">       
        <button class="btn btn-secondary" @click.prevent="toggleLocation">{{showPosition? 'Nascondi Posizione':'Trova Posizione'}}</button>
        <div v-if="showPosition && latitude && longitude" class="results m-0">
          <span>
              <strong>Lat:</strong> {{ latitude }} | <strong>Long:</strong> {{ longitude }}
          </span>
        </div>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="item in dateList">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="item.picture" alt="Card image cap">
            <div class="card-body" >
              <h5 class="card-title">{{item.date}}</h5>
              <a href="#" class="btn btn-primary" @click.prevent="item.showcard=!item.showcard">{{item.showcard ? item.daylight : 'Guarda la Daylight duration'}}</a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
</template>

<style src="./Home.css"></style>