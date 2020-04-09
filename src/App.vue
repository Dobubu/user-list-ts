<template lang='pug'>
#app
  AppMenu(:msg='msg', @send='changeText')
  router-view
  p.text-center {{menuInfo}}
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator';
import AppMenu from '@/components/AppMenu.vue'
import { Menu } from '@/lib/menu'

@Component({ components: { AppMenu } })

export default class MyComponent extends Vue {
  msg = ''
  menuInfo = {}

  @Provide() foo = 'foo'

  reload() {
    this.msg = 'Msg from Reload'
  }

  changeText(payload: Menu) {
    this.menuInfo = payload
  }

  mounted() {
    this.msg = 'Msg from App'
  }
}
</script>