<template>
  <div class="product-price-component">
    <div class="name">{{ productName }}</div>
    <div class="price">PHP {{ productPrice.toFixed(2) }}</div>
    <div class="button">
      <q-btn
        unelevated
        color="primary"
        label="Edit Product"
        @click="$emit('edit')"
      />
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
  }
  .button {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
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
    return {
      productPrice,
      productName,
    };
  },
});
</script>
