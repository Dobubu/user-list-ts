<template lang="pug">
.wrap
  .login
    .content.text-center
      input.form-control(v-model='form.account', placeholder='account')
      input.form-control(v-model='form.password', placeholder='password')
      button.btn.btn-primary(@click='submit') submit
      p
        | use
        br
        | account: test, password: 111
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { login, LoginOptions } from '@/lib/auth';

@Component
export default class Login extends Vue {
  form: LoginOptions = {
    account: 'test',
    password: 111,
  };

  async submit() {
    try {
      const res = await login(this.form);

      this.$bvToast.toast(res, {
        title: res,
        autoHideDelay: 1000,
        // appendToast: false
      });

      // this.$router.push('/draw')
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .login {
    .head {
      font-size: 2em;
    }
    .content {
      font-size: 1em;
      input {
        margin-bottom: 0.5em;
      }
    }
    p {
      color: #db7307;
    }
  }
}
</style>
