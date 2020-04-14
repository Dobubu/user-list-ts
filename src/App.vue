<template lang="pug">
#app
  div(v-if="$route.path !== '/'")
    AppMenu(:msg='msg', @send='changeText')
    .container

      router-view
      //- p.text-center {{menuInfo}}
  router-view(v-else)
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator';
import AppMenu from '@/components/AppMenu.vue';
import { Menu } from '@/lib/menu';

@Component({ components: { AppMenu } })
export default class MyComponent extends Vue {
  msg = '';

  menuInfo = {};

  @Provide() foo = 'provide foo';

  changeText(payload: Menu) {
    this.menuInfo = payload;
  }

  get isAuth() {
    return localStorage.getItem('authInfo');
  }

  mounted() {
    this.msg = 'Msg from App';
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 5.5em;
}
</style>
