<template>
  <div class="content-wrapper">

    <div class="ui top attached tabular menu">
      <a class="item active" data-tab="first">First</a>
      <a class="item" data-tab="second">Second</a>
      <a class="item" data-tab="third">Third</a>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="first">
      <books-by-city></books-by-city>
    </div>
    <div class="ui bottom attached tab segment" data-tab="second">
      Second
    </div>
    <div class="ui bottom attached tab segment" data-tab="third">
      Third
    </div>

  </div>
</template>


<script>
import BooksByCity from '@/components/BooksByCity'

export default {
  name: 'HelloWorld',
  components: {
    BooksByCity
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.mountTabs()
  },
  methods: {
    mountTabs: function () {
      $('.menu .item').tab()
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

</style>

