<template>
  <div>
    <h1>Book mentions near a city</h1>

    <p id="hint">Try Copenhagen with latitude
      <b>12.5683</b> and longitude
      <b>55.6761</b>
    </p>

    <!-- Geolocation Input form -->
    <div class="ui form">
      <div class="inline fields">
        <label>Geolocation</label>
        <div class="field">
          <input type="text" placeholder="Latitude" v-model="geolocation.latitude">
        </div>
        <div class="field">
          <input type="text" placeholder="Longitude" v-model="geolocation.longitude">
        </div>
      </div>
    </div>

    <div class="ui submit button" @click="getBooksByGeolocation">Submit</div>

    <div id="mentions-nearby-map"></div>

    <div class="city-stats">
      <h5 v-show="citiLocations.length > 0">Cities mentioned</h5>
      <div class="ui list">
        <div class="item" v-for="(city, key) in citiLocations" :key="key">{{ city.cityName }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      geolocation: {
        latitude: '',
        longitude: ''
      },
      citiLocations: []
    }
  },
  created() {

  },
  methods: {
    getBooksByGeolocation: function () {
      const vm = this
      const lat = this.geolocation.latitude
      const lng = this.geolocation.longitude

      axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/books/bylocation/${lat}/${lng}`)
        .then(function (response) {
          console.log('resp', response.data.Vicenety)
          if (response.data.Vicenety) {
            vm.citiLocations = response.data.Vicenety
            vm.plotCitiesOnMap()
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    plotCitiesOnMap: function () {
      const cities = this.citiLocations

      const map = new google.maps.Map(document.getElementById('mentions-nearby-map'), {
        zoom: 8,
        center: {
          lat: cities[0].latitude,
          lng: cities[0].longitude
        }
      });

      console.log(`Plotting ${cities.length} cities`)
      console.log('cities', cities)
      for (let index = 0; index < cities.length; index++) {
        let city = cities[index]
        var marker = new google.maps.Marker({
          position: {
            lat: city.latitude,
            lng: city.longitude
          },
          map: map
        });
      }
    },
  }
}

</script>

<style lang="scss" scoped>

#mentions-nearby-map {
  height: 400px;
  width: 100%;
  margin-top: 20px;
}

#hint {
  text-align: left;
  margin-top: 40px;
}

.city-stats {
  text-align: left;
  margin-top: 40px;
}

</style>
