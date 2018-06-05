import Vue from 'vue'
import Gutenberg from '@/components/Gutenberg'

describe('Gutenberg.vue', () => {
  it('should render a tab', () => {
    const Constructor = Vue.extend(Gutenberg)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#books-by-city-tab').textContent).to.equal('Books by city')
  })

  it('should load cities from database within 3 seconds', () => {
    const Constructor = Vue.extend(Gutenberg)
    const vm = new Constructor().$mount()

    setTimeout(function () {
      expect(vm.$el.querySelector('#book-count').textContent).to.equal('48377')
      done();
    }, 3000);
  })
})
