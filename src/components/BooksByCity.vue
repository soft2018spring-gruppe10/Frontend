<template>
  <div>
    <h1>Get books by city</h1>
    <div class="ui search" id="city-search">
      <input class="prompt" type="text" placeholder="Type a city">
      <div class="results"></div>
    </div>

    <div class="ui label item-stats">
      Cities
      <div class="detail"> {{ allCities.length }} </div>
    </div>

    <div class="ui active centered inline loader" id="loading-spinner" v-show="requestPending"></div>

    <div class="statistics-container">
      <div class="ui statistic" v-show="books.length > 1">
        <div class="value">
          {{ books.length }}
        </div>
        <div class="label">
          Books
        </div>
      </div>

      <div class="ui statistic" v-show="books.length > 0">
        <div class="value">
          {{ cityChosen }}
        </div>
        <div class="label">
          City
        </div>
      </div>
    </div>

    <table class="ui celled table" v-show="books.length > 0">
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
import _ from 'lodash'

export default {
  data: function () {
    return {
      allCities: [],
      books: [],
      requestPending: false,
      cityChosen: '',
    }
  },
  created() {
    this.getAllCities()
  },
  methods: {
    getAllCities: function () {
      const vm = this
      axios.get('/static/allCities.json')
        .then(response => {
          this.allCities = response.data.AllCities
          this.mountAutocompleteData()
        })
        .catch(error => {
          console.log('Error getting all cities. Will retry in 5 seconds.')
          setTimeout(() => {
            vm.getAllCities()
          }, 5000);
        })
    },
    getBooksByCity: function (cityId) {
      const vm = this;
      // show request pending spinner
      this.requestPending = true
      // reset books array to clear table
      this.books = []

      axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/books/bycity/${cityId}`)
        .then(response => {
          const booksOrdered = _.orderBy(response.data.books, ['mentionCount'], ['desc'])
          vm.books = booksOrdered
          this.requestPending = false
        })
        .catch(error => {
          console.log('error', error)
          this.requestPending = false
        })
    },
    mountAutocompleteData: function () {
      console.log('all cities', this.allCities.length)
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
          console.log('city', city)
          vm.cityChosen = city.cityName
          vm.getBooksByCity(city.id)
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>

#loading-spinner {
  margin-top: 50px;
  margin-bottom: 50px;
}

.statistics-container {
  margin-top: 70px;
}

.statistic {
  padding-left: 50px;
}

</style>
