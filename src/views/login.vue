<template lang="pug">
form.wrap(@submit.prevent="submit")
  .login.text-center
    h1.mb-5 Login
    .content
      input.form-control(v-model="form.account" placeholder="account")
      input.form-control(v-model="form.password" placeholder="password")
      button.btn.btn-primary(type="submit") submit
      blockquote.blockquote.text-center.mt-5
        p
          | Any Account
          br
          | Password is this year
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { login, LoginOptions } from '@/lib/auth';

@Component
export default class Login extends Vue {
  form: LoginOptions = {
    account: 'Mischa',
    password: '2020',
  };

  validate() {
    if (this.form.account === '') throw Error('Account Require!');
  }

  async submit() {
    try {
      this.validate();
      const res = await login(this.form);

      if (res === 'Success') {
        this.$bvToast.toast(res, {
          title: `Login ${res}`,
          autoHideDelay: 1500,
          variant: 'success',
          toaster: 'b-toaster-top-center',
        });
        localStorage.setItem('authInfo', JSON.stringify(this.form));
        this.$router.push('/userList');
      } else {
        this.$bvToast.toast(res, {
          title: `Login ${res}`,
          autoHideDelay: 1500,
          variant: 'danger',
          toaster: 'b-toaster-top-center',
        });
      }
    } catch (e) {
      // fix
      // this.$toastHandle('Error', e.message, 'danger')
      this.$bvToast.toast(e.message, {
        title: 'Error',
        autoHideDelay: 1500,
        variant: 'danger',
        toaster: 'b-toaster-top-center',
      });
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
      color: #374b35;
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
