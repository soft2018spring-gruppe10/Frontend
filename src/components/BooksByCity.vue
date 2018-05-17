<template>
  <div>
    <h1>1. Get books by city</h1>
    <div class="ui search" id="city-search">
      <input class="prompt" type="text" placeholder="Type a city">
      <div class="results"></div>
    </div>

    <table class="ui celled table">
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Mention Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, key) in books" :key="key">
          <td>{{ book.author }}</td>
          <td>{{ book.bookTitle }}</td>
          <td>{{ book.mentionCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      allCities: [],
      books: [],
    }
  },
  created() {
    this.getAllCities()
  },
  methods: {
    getAllCities: function () {
      axios.get('http://localhost:8080/static/allCities.json')
        .then(response => {
          this.allCities = response.data.AllCities
          this.mountAutocompleteData()
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    getBooksByCity: function (cityId) {
      axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/books/bycity/${cityId}`)
        .then(response => {
          console.log('books by city resp', response)
          this.books = response.data.books
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    mountAutocompleteData: function () {
      console.log('allcities length', this.allCities.length)
      var content = this.allCities
      const vm = this
      $('#city-search').search({
        source : content,
        searchFields   : [
          'cityName'
        ],
        fields: {
          title: 'cityName',
          id: 'id',
          description: 'id'
        },
        fullTextSearch: false,
        onSelect: function (city) {
          vm.getBooksByCity(city.id)
        }
      })
    }
  }
}

</script>

