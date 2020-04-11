<template lang="pug">
#app
  div(v-if='isAuth')
    AppMenu(:msg='msg', @send='changeText')
    router-view
    p.text-center {{path}}
    p.text-center {{menuInfo}}
  router-view(v-else)
</template>

<script lang="ts">
import { Component, Provide, Watch, Vue } from 'vue-property-decorator';
import AppMenu from '@/components/AppMenu.vue';
import { Menu } from '@/lib/menu';

@Component({ components: { AppMenu } })
export default class MyComponent extends Vue {
  msg = '';

  menuInfo = {};

  path = '';

  @Provide() foo = 'provide foo';

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    this.path = newVal.path;
  }

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
