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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User, UserForm } from '@/lib/user'
import cloneDeep from 'lodash/fp/cloneDeep';

import faker from 'faker'

@Component
export default class UserList extends Vue{
  items: UserForm[] = []

  total = 15

  getUsers() {
    const users = Array.from(new Array(this.total), (v, i) => {
      const list = {
        id: i+1,
        name: faker.name.findName(),
        job: faker.name.jobType(),
        tel: faker.phone.phoneNumberFormat(),
        city: faker.address.city()
      }
      return list
    })

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
    })

    return users.map(formate)
  }

  update(item: User, i: number) {
    this.items[i].edited = true
  }

  cancel(item: User, i: number) {
    this.items[i].edited = false
    this.items[i].form = cloneDeep(this.items[i].original)
  }

  save(item: User, i: number) {
    this.items[i].edited = false
    this.items[i].original = cloneDeep(this.items[i].form)
    localStorage.setItem('userlist', JSON.stringify(this.items))
  }

  mounted() {
    if(localStorage.getItem('userlist')) {
      this.items = JSON.parse(localStorage.getItem('userlist') || '{}')
    } else {
      this.items = this.getUsers()
      localStorage.setItem('userlist', JSON.stringify(this.items))
    }
  }
}
</script>