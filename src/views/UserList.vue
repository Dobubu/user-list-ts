<template lang="pug">
.list
  table.table
    thead
      tr
        th(
          scope='col'
          v-for='(item, key) in items[0].form'
          :key='item.id'
        ) {{ key.toUpperCase() }}
    tbody
      tr(v-for='(item, index) in items')
        td {{ item.form.id }}
        td
          input.form-control(
            v-model='item.form.name'
            @input='update(item, index)')
        td
          input.form-control(
            v-model='item.form.job'
            @input='update(item, index)')
        td
          input.form-control(
            v-model='item.form.tel'
            @input='update(item, index)')
        td
          input.form-control(
            v-model='item.form.city'
            @input='update(item, index)')
        td(v-show='item.edited')
          button.btn.btn-danger.mr-2(@click='cancel(item, index)') Cancel
          button.btn.btn-primary(@click='save(item, index)') Save
  b-pagination(
    class='float-right'
    v-model='currentPage'
    :total-rows='total'
    :per-page='perPage'
    @input='goPage'
  )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User, UserForm } from '@/lib/user';
import cloneDeep from 'lodash/fp/cloneDeep';
import chunk from 'lodash/fp/chunk';

import faker from 'faker';

@Component
export default class UserList extends Vue {
  items: UserForm[] = [];

  paginationItems: any[] = [];

  currentPage = 1;

  perPage = 10;

  total = 15;

  getUsers() {
    const users = Array.from(new Array(this.total), (v, i) => {
      const list = {
        id: i + 1,
        name: faker.name.findName(),
        job: faker.name.jobType(),
        tel: faker.phone.phoneNumberFormat(),
        city: faker.address.city(),
      };
      return list;
    });

    const formate = (item: User) => ({
      id: item.id,
      original: item,
      form: {
        id: item.id,
        name: item.name,
        job: item.job,
        tel: item.tel,
        city: item.city,
      },
      edited: false,
      saved: true,
      loading: false,
    });

    return chunk(this.perPage, users.map(formate));
  }

  goPage() {
    this.paginationItems = JSON.parse(localStorage.getItem('userlist') || '{}');
    this.items = this.paginationItems[this.currentPage - 1];
  }

  update(item: User, i: number) {
    this.paginationItems[this.currentPage - 1][i].edited = true;
  }

  cancel(item: User, i: number) {
    this.paginationItems[this.currentPage - 1][i].edited = false;
    this.paginationItems[this.currentPage - 1][i].form = cloneDeep(
      this.paginationItems[this.currentPage - 1][i].original,
    );
  }

  save(item: User, i: number) {
    this.paginationItems[this.currentPage - 1][i].edited = false;
    this.paginationItems[this.currentPage - 1][i].original = cloneDeep(
      this.paginationItems[this.currentPage - 1][i].form,
    );
    localStorage.setItem('userlist', JSON.stringify(this.paginationItems));
  }

  mounted() {
    if (localStorage.getItem('userlist')) {
      this.goPage();
    } else {
      localStorage.setItem('userlist', JSON.stringify(this.getUsers()));
      this.goPage();
    }
  }
}
</script>
<style lang="scss" scoped>
table {
  th,
  td {
    background-color: inherit;
    border: none;
  }
  th {
    font-weight: bold;
    color: #458766;
    font-size: 1.3em;
  }
  color: #458766;
  input {
    color: #458766;
  }
}
</style>
