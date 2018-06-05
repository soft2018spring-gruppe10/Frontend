<template>
  <div class="content-wrapper">
    <h1>The Gutenberg Project - Group 10</h1>
    <h2>Kristian, Daniel and Edmond</h2>

    <div id="restart-btn" class="ui button" v-bind:class="{loading: serverRestartPending}"
      @click="restartServer" data-tooltip="Restart server if items are not loaded" data-position="bottom right">
      Restart Server
    </div>

    <div class="tabs-container">
      <div class="ui top attached tabular menu">
        <a class="item active" data-tab="first" id="books-by-city-tab">Books by city</a>
        <a class="item" data-tab="second">Cities in book</a>
        <a class="item" data-tab="third">Cities by author</a>
        <a class="item" data-tab="fourth">Books near a city</a>
      </div>
      <div class="ui bottom attached tab segment active" data-tab="first">
        <books-by-city></books-by-city>
      </div>
      <div class="ui bottom attached tab segment" data-tab="second">
        <cities-in-book></cities-in-book>
      </div>
      <div class="ui bottom attached tab segment" data-tab="third">
        <cities-by-author></cities-by-author>
      </div>
      <div class="ui bottom attached tab segment" data-tab="fourth">
        <books-near-a-city></books-near-a-city>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios'
import BooksByCity from '@/components/BooksByCity'
import CitiesInBook from '@/components/CitiesInBook'
import CitiesByAuthor from '@/components/CitiesByAuthor'
import BooksNearACity from '@/components/BooksNearACity'

export default {
  name: 'HelloWorld',
  components: {
    BooksByCity,
    CitiesInBook,
    CitiesByAuthor,
    BooksNearACity,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      serverRestartPending: false,
    }
  },
  mounted() {
    this.mountTabs()
  },
  methods: {
    mountTabs: function () {
      $('.menu .item').tab()
    },
    restartServer: function () {
      console.log('restarting server...')
      this.serverRestartPending = true
      const vm = this
      axios.get('https://cors.io/?http://167.99.206.3:8081/server/api/setdb/redis/redis')
        .then(response => {
          if (response.data == 'succes') {
            console.log('Server restart success')
          }
          console.log('Server restart error', response.data)
          vm.serverRestartPending = false
        })
        .catch(error => {
          console.log('Server restart error', error)
          vm.serverRestartPending = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<style lang="scss" scoped>

.content-wrapper {
  padding: 20px;
}

#restart-btn {
  position: absolute;
  top: 20px;
  right: 10px;
}

.tabs-container {
  margin-top: 50px;
}

</style>

<style lang="scss">
/* Global variables */

.item-stats {
  position: absolute;
  right: 10px;
  top: 22px;
}

</style>


