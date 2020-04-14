<template lang="pug">
  table.table
    thead
      tr
        th id
        th name
        th job
        th tel
        th city
    tbody
      tr
        td
        td
          input.form-control(
            v-model="addItem.name"
          )

        td
          input.form-control(
            v-model="addItem.job"
          )
        td
          input.form-control(
            v-model="addItem.tel"
          )
        td
          input.form-control(
            v-model="addItem.city"
          )
        td
          button.btn.btn-primary.mr-2(@click="add") Add
      //- tr
        td
        td
          input.form-control(
            :value="addItem.name"
            @input="updateAdd($event.target.value, 'name')"
          )

        td
          input.form-control(
            :value="addItem.job"
            @input="updateAdd($event.target.value, 'job')"
          )
        td
          input.form-control(
            :value="addItem.tel"
            @input="updateAdd($event.target.value, 'tel')"
          )
        td
          input.form-control(
            :value="addItem.city"
            @input="updateAdd($event.target.value, 'city')"
          )
        td
          button.btn.btn-primary.mr-2(@click="add") Add
      tr(v-for="(item, index) in items")
        td {{ item.form.id }}
        td
          input.form-control(
            :value="item.form.name"
            @input="updateProp(index, $event.target.value, 'name')"
          )
        td
          input.form-control(
            :value="item.form.job"
            @input="updateProp(index, $event.target.value, 'job')"
          )
        td
          input.form-control(
            :value="item.form.tel"
            @input="updateProp(index, $event.target.value, 'tel')"
          )
        td
          input.form-control(
            :value="item.form.city"
            @input="updateProp(index, $event.target.value, 'city')"
          )
        td(v-show="item.edited")
          button.btn.btn-danger.mr-2(@click="cancel(index)") Cancel
          button.btn.btn-danger.mr-2(@click="del(index)") Del
          button.btn.btn-primary(@click="save(index)") Save
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/lib/user';
import { FormItem } from '@/lib/form';

import cloneDeep from 'lodash/fp/cloneDeep';

type ItemType = FormItem<User, User>;

@Component
export default class TableUser extends Vue {
  @Prop({ type: Array, default: () => [] })
  items!: ItemType[];

  @Prop({ type: Array, default: () => [] })
  totalItems!: ItemType[];

  addItem: User = {
    id: 0,
    name: 't',
    job: 't',
    tel: 't',
    city: 't',
  };

  updateProp(index: number, value: string, prop: keyof User) {
    const target = this.items[index];
    if (!target) return;

    const result: ItemType = {
      ...target,
      form: {
        ...target.form,
        [prop]: value,
      },
      edited: true,
    };

    this.emitEdit(index, result);
  }

  emitEdit(index: number, value: ItemType) {
    this.$emit('edit', index, value);
  }

  cancel(index: number) {
    const target = this.items[index];

    this.$emit('cancel', index, target);
  }

  del(index: number) {
    const target = this.items[index];

    this.$emit('del', index, target);
  }

  save(index: number) {
    const target = this.items[index];

    this.$emit('save', index, target);
  }

  add() {
    this.addItem.id = this.totalItems.length;
    this.$emit('add', this.addItem);
  }
}
</script>

<style lang="scss" scoped>
table {
  color: transparent;
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
