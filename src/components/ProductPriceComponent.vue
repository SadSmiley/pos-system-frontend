<template>
  <div class="product-price-component">
    <div class="name">{{ productName }}</div>
    <div class="price">&#8369;{{ productPrice.toFixed(2) }}</div>
    <div class="price small" v-if="productPricePcs">
      &#8369;{{ productPriceTotal.toFixed(2) }} per {{ productPricePcs }} pcs
    </div>
    <div class="button">
      <q-btn unelevated color="primary" label="Edit" @click="$emit('edit')" />
      <q-btn unelevated color="red" label="Close" @click="$emit('close')" />
    </div>
  </div>
</template>

<style lang="scss">
.product-price-component {
  padding: 1rem;
  background-color: #fff;
  text-align: center;
  .name {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .price {
    font-size: 2.5rem;
    font-weight: 500;
    &.small {
      font-size: 1.5rem;
      font-weight: 400;
    }
  }
  .button {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    column-gap: 15px;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProductPriceComponent',
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const productName = ref<string>(props.productData.name);
    const productPrice = ref<number>(props.productData.price);

    let total = productPrice.value;
    let pcs = 0;

    while (total % 1 !== 0) {
      total += total;
      pcs += 1;
    }

    return {
      productPrice,
      productName,
      productPriceTotal: total,
      productPricePcs: pcs,
    };
  },
});
</script>
