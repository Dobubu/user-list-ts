<template lang="pug">
.wrap
  .login.text-center
    h1.mb-5 Login
    .content
      input.form-control(v-model='form.account', placeholder='account')
      input.form-control(v-model='form.password', placeholder='password')
      button.btn.btn-primary(@click='submit') submit
      blockquote.blockquote.text-center
        p account: test, password: 111
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

      if (res === 'Success') {
        this.$bvToast.toast(res, {
          title: `Login ${res}`,
          autoHideDelay: 1000,
          variant: 'success',
          toaster: 'b-toaster-top-center',
        });
      } else {
        this.$bvToast.toast(res, {
          title: `Login ${res}`,
          autoHideDelay: 1000,
          variant: 'danger',
          toaster: 'b-toaster-top-center',
        });
      }

      // this.$router.push('/draw')
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .login {
    h1 {
      font-size: 5.5em;
    }
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
      color: #374b35;
    }
  }
}
</style>
