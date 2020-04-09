<template lang='pug'>
nav.navbar.navbar-expand-lg.navbar-light.bg-light
  a.navbar-brand(href='#') Navbar
  button.navbar-toggler(
    type='button', 
    data-toggle='collapse', data-target='#navbarColor03', aria-controls='navbarColor03', aria-expanded='false', aria-label='Toggle navigation')
    span.navbar-toggler-icon
  #navbarColor03.collapse.navbar-collapse
    ul.navbar-nav.mr-auto
      li.nav-item.active(v-for="item in menuList", :key='item.id', @click='send(item)')
        a.nav-link(href='#') {{item.title}}
    ul.navbar-nav.ml-auto
      li.nav-item
        a.nav-link(href='#') {{msg}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Menu } from '@/lib/menu'

@Component
export default class AppMenu extends Vue {
  @Prop({default:'xxx'}) 
  msg!: string;

  menuList = [{
    title: 'Home',
    id: 1
  }, {
    title: 'Features',
    id: 2
  }, {
    title: 'Pricing',
    id: 3
  }]

  send(info: Menu) {
    this.$emit('send', info)
  }
}
</script>
