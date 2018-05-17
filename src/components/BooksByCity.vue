<template>
  <div>
    <h1>1. Get books by city</h1>
    <div class="ui search">
      <input class="prompt" type="text" placeholder="Common passwords...">
      <div class="results"></div>
      <div @click="showResult">result:</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      allCities: []
    }
  },
  created() {
    this.getAllCities()
    // this.mountAutocompleteData()
  },
  methods: {
    showResult: function () {
      const res = $('.ui.search').search('get result', 'cityName')
      console.log('res', res)
      
    },
    getAllCities: function () {
      axios.get('http://localhost:8080/static/allCities.json')
        .then(response => {
          this.allCities = response.data.AllCities
          window.allCities = response.data.AllCities
          console.log('all', Object.getOwnPropertyNames(this.allCities))
          this.mountAutocompleteData()
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    mountAutocompleteData: function () {
      console.log('allcities length', this.allCities.length)
      var content = this.allCities
      $('.ui.search').search({
          source : content,
          searchFields   : [
            'cityName'
          ],
          fields: {
            title: 'cityName',
            description: 'id'
          },
          fullTextSearch: false
      })
    }
  }
}

</script>

