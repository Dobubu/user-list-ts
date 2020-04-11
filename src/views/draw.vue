<template lang="pug">

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { middleware, Color, ColorItem } from '@/lib/draw';

@Component
export default class Products extends Vue {
  draw: Color<ColorItem, ColorItem>[] = [];

  load() {
    let items: Color<ColorItem, ColorItem>[] = [];
    const transformEditable = (o: ColorItem) => ({
      original: o,
      info: {
        title: o.title,
        id: o.id,
      },
      opacity: false,
    });
    const res = [
      {
        title: 'triangle',
        id: 6,
      },
      {
        title: 'circle',
        id: 7,
      },
    ];

    items = res.map(transformEditable);
    this.draw = items;
    console.log(this.draw);
  }

  save2String(): string {
    return '123';
  }

  save2Number(): number {
    return 123;
  }

  mounted() {
    const valueByString = middleware(this.save2String());
    const valueByNumber = middleware(this.save2Number());
    console.log(valueByString, valueByNumber);
    this.load();
  }
}
</script>
