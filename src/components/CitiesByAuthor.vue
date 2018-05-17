<template>
  <div>
    <h1>All cities mentioned by an author</h1>

    <div class="ui label item-stats">
      Authors
      <div class="detail"> {{ allAuthors.length }} </div>
    </div>

    <div class="ui search" id="author-search">
      <input class="prompt" type="text" placeholder="Type an author">
      <div class="results"></div>
    </div>

    <div id="all-cities-map"></div>

    <div v-show="allBooksByAuthor.length > 0">
      <h2>All books by {{ chosenAuthor }}</h2>
      <div class="ui list">
        <div class="item" v-for="(book, key) in allBooksByAuthor" :key="key">{{ book.bookTitle }}</div>
      </div>
    </div>

    <!-- <table class="ui celled table" >
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, key) in allBooksByAuthor" :key="key">
          <td>{{ book.bookId }}</td>
          <td>{{ book.bookTitle }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      allAuthors: [],
      allBooksByAuthor: [],
      allCitiesByAuthor: [],
      chosenAuthor: ''
    }
  },
  mounted() {
    this.getAllAuthors()
  },
  methods: {
    getAllAuthors: function () {
      const vm = this
      axios.get('https://cors.io/?http://167.99.206.3:8081/server/api/authors')
        .then(response => {
          this.allAuthors = response.data.AllAuthors
          this.mountAutocompleteData()
        })
        .catch(error => {
          console.log('Error getting all authors. Will retry in 5 seconds.')
          setTimeout(() => {
            vm.getAllAuthors()
          }, 5000);
        })
    },
    // When an author is chosen, get all their books
    getBooksByAuthor: function (authorName) {
      axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/books/byauthor/${authorName}`)
        .then(response => {
          console.log('books by author:', response.data)
          this.allBooksByAuthor = response.data.books
          this.getCitiesFromAllBooks()
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    // Get list of cities by each book
    getCitiesFromAllBooks: function () {
      let promiseArray = []

      this.allBooksByAuthor.forEach(book => {
        console.log('working with book', book)
        const cityPromise = this.getCitiesByBook(book.bookId)
        promiseArray.push(cityPromise)
      })
      console.log('promise array length:', promiseArray.length)
      Promise.all(promiseArray)
        .then(respArray => {
          const vm = this
          respArray.map(function (response) {
            let citiesArray = response.data.cities
            if (citiesArray) {
              citiesArray.map(city => {
                vm.allCitiesByAuthor.push(city)
                console.log('adding city ', city)
              })
            }
          })
          console.log('all data has come back, allCitiesByAuthor', this.allCitiesByAuthor.length)
          this.plotCitiesOnMap()
        })
    },
    getCitiesByBook: function (bookId) {
      return axios.get(`https://cors.io/?http://167.99.206.3:8081/server/api/cities/bybook/${bookId}`)
    },
    plotCitiesOnMap: function () {
      const map = new google.maps.Map(document.getElementById('all-cities-map'), {
        zoom: 1.5,
        center: {
          lat: 0,
          lng: 0
        }
      });

      for (let index = 0; index < this.allCitiesByAuthor.length; index++) {
        var marker = new google.maps.Marker({
          position: this.allCitiesByAuthor[index],
          map: map
        });
      }
    },
    mountAutocompleteData: function () {
      console.log('all authors:', this.allAuthors.length)
      const vm = this
      $('#author-search').search({
        source: vm.allAuthors,
        fullTextSearch: false,
        onSelect: function (author) {
          vm.chosenAuthor = author.title
          vm.getBooksByAuthor(author.title)
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>

#all-cities-map {
  height: 400px;
  width: 100%;
  margin-top: 20px;
}

</style>

