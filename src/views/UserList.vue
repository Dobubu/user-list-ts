<template lang="pug">
.list
  TableUser(
    :items="items"
    :totalItems="totalItems"
    @edit="editItem"
    @cancel="cancelItem"
    @del="delItem"
    @save="saveItem"
    @add="addItem"
  )
  b-pagination(
    class="float-right"
    v-model="currentPage"
    :total-rows="total"
    :per-page="perPage"
    @input="goPage"
  )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User, UserForm, initUsers, userFormMapper } from '@/lib/user';
import { FormItem } from '@/lib/form';

import cloneDeep from 'lodash/fp/cloneDeep';
import chunk from 'lodash/fp/chunk';
import set from 'lodash/fp/set';
import some from 'lodash/fp/some';

import TableUser from '@/components/tables/TableUser.vue';

@Component({
  components: { TableUser },
})
export default class UserList extends Vue {
  items: UserForm[] = []; // current pagination data

  totalItems: FormItem<User, User>[] = []; // total data

  currentPage = 1;

  perPage = 10;

  total = 17;

  getUsers() {
    const users = initUsers(this.total);
    return users.map(userFormMapper);
  }

  goPage() {
    this.totalItems = JSON.parse(localStorage.getItem('totalItems') || '{}');
    const paginationItems = chunk(this.perPage, this.totalItems);
    this.items = paginationItems[this.currentPage - 1];
  }

  init() {
    const paginationItems = chunk(this.perPage, this.totalItems);
    this.items = cloneDeep(paginationItems[this.currentPage - 1]);
  }

  delItem(i: number, value: FormItem<User, User>) {
    const indexByTotal = this.totalItems.map(item => item.id).indexOf(value.id);

    this.items.splice(i, 1);
    this.totalItems.splice(indexByTotal, 1);
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
  }

  addItem(value: User) {
    const { id, name, job, tel, city } = value;
    if (!id || !name || !job || !tel || !city) return;

    const empty = [];
    empty.push(value);

    // const anyFault = some(o => !o);
    // if (!anyFault(empty)) {
    //   return;
    // }

    const addItem = empty.map(userFormMapper);
    this.totalItems = this.totalItems.concat(addItem);
    localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
  }

  cancelItem(i: number, value: FormItem<User, User>) {
    const indexByTotal = this.totalItems.map(item => item.id).indexOf(value.id);

    this.items[i].edited = false;
    this.items[i].form = cloneDeep(this.items[i].original);
    this.totalItems[indexByTotal].edited = false;
    this.totalItems[indexByTotal].form = cloneDeep(this.totalItems[indexByTotal].original);

    this.$bvToast.toast('Cancel', {
      title: 'Update Cancel',
      autoHideDelay: 1500,
      variant: 'warning',
      toaster: 'b-toaster-top-center',
    });
  }

  async saveItem(i: number, value: FormItem<User, User>) {
    try {
      const message = `Are you sure update ID ${i + 1} data?`;

      const result: boolean = await this.$bvModal.msgBoxConfirm(message);
      if (!result) {
        this.cancelItem(i, value);
        return;
      }

      const indexByTotal = this.totalItems.map(item => item.id).indexOf(value.id);

      this.items[i].edited = false;
      this.items[i].original = cloneDeep(this.items[i].form);

      this.totalItems[indexByTotal].edited = false;
      this.totalItems[indexByTotal].original = cloneDeep(this.totalItems[indexByTotal].form);

      localStorage.setItem('items', JSON.stringify(this.items));
      localStorage.setItem('totalItems', JSON.stringify(this.totalItems));

      this.$bvToast.toast('Success', {
        title: 'Update Success',
        autoHideDelay: 1500,
        variant: 'success',
        toaster: 'b-toaster-top-center',
      });
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    const userList = localStorage.getItem('items');
    if (userList) {
      this.goPage();
    } else {
      this.totalItems = cloneDeep(this.getUsers());
      this.init();
      localStorage.setItem('items', JSON.stringify(this.items));
      localStorage.setItem('totalItems', JSON.stringify(this.totalItems));
    }
  }

  editItem(i: number, value: FormItem<User, User>) {
    const updated = set(`[${i}]`, value, this.items);
    const indexByTotal = this.totalItems.map(item => item.id).indexOf(value.id);
    const updatedTotal = set(`[${indexByTotal}]`, value, this.totalItems);

    this.items = updated;
    this.totalItems = updatedTotal;
  }
}
</script>
