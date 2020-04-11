<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.bg-light.fixed-top
  router-link(
    to='/'
    class='navbar-brand'
  ) Home
  button.navbar-toggler(
    type='button'
    data-toggle='collapse'
    data-target='#navbarColor03'
    aria-controls='navbarColor03'
    aria-expanded='false'
    aria-label='Toggle navigation'
  )
    span.navbar-toggler-icon
  #navbarColor03.collapse.navbar-collapse
    ul.navbar-nav.mr-auto
      li.nav-item(
        v-for="item in menuList"
        :key="item.id"
      )
        router-link(
          :to='item.path'
          class='nav-link'
        ) {{ item.title }}

//- nav.navbar.navbar-expand-lg.navbar-light.bg-light
  a.navbar-brand(href="/") Home
  button.navbar-toggler(
    type="button"
    data-toggle="collapse"
    data-target="#navbarColor03"
    aria-controls="navbarColor03"
    aria-expanded="false"
    aria-label="Toggle navigation"
  )
    span.navbar-toggler-icon
  #navbarColor03.collapse.navbar-collapse
    ul.navbar-nav.mr-auto
      li.nav-item.active(
        v-for="item in menuList"
        :key="item.id"
        @click="send(item)"
      )
        a.nav-link(href="#") {{ item.title }}
    ul.navbar-nav.ml-auto
      li.nav-item
        a.nav-link(href="#") {{ msg }} {{ foo }}

</template>

<script lang="ts">
import { Component, Prop, Inject, Emit, Vue } from 'vue-property-decorator';
import { Menu } from '@/lib/menu';

@Component
export default class AppMenu extends Vue {
  @Prop({ default: 'xxx' })
  msg!: string;

  @Inject()
  foo!: string;

  menuList: Menu[] = [
    {
      id: 1,
      title: 'UserList',
      path: '/userList',
    },
    {
      id: 2,
      title: 'Content',
      path: '',
    },
  ];

  // @Emit()
  // send(info: Menu) {
  //   return info
  // }

  send(info: Menu) {
    this.$emit('send', info);
  }
}
</script>
