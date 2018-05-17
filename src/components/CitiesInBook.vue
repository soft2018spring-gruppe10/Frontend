<template>
  <div>
    <h1>2. All cities in a book</h1>
    <div class="ui search" id="book-search">
      <input class="prompt" type="text" placeholder="Type a book">
      <div class="results"></div>
    </div>

    <div id="map"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      allBooks: [],
      cities: []
    }
  },
  created() {
    this.getAllBooks()
  },
  methods: {
    getAllBooks: function () {
      axios.get('https://cors.io/?http://167.99.206.3:8081/server/api/books')
        .then(response => {
          this.allBooks = response.data.AllBooks
          this.mountAutocompleteData()
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    getCitiesByBook: function (bookId) {
      axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/cities/bybook/${bookId}`)
        .then(response => {
          console.log('cities by a book:', response.data)
          this.cities = response.data.cities
          this.plotCitiesOnMap()
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    plotCitiesOnMap: function () {

      var uluru = {
        lat: -25.363,
        lng: 131.044,
        cityName: "cop",
      };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1.5,
        center: {
          lat: 0,
          lng: 0
        }
      });

      for (let index = 0; index < this.cities.length; index++) {
        var marker = new google.maps.Marker({
          position: this.cities[index],
          map: map
        });
      }
    },
    mountAutocompleteData: function () {
      console.log('all books array length', this.allBooks.length)
      const vm = this
      $('#book-search').search({
        source: vm.allBooks,
        searchFields   : [
          'bookTitle'
        ],
        fields: {
          title: 'bookTitle',
          id: 'bookId',
          description: 'bookId'
        },
        fullTextSearch: false,
        onSelect: function (book) {
          vm.getCitiesByBook(book.bookId)
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
#map {
  height: 400px;
  width: 100%;
  margin-top: 20px;
}
</style>
