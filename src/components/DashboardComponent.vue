<template>
  <div class="dashboard q-pa-md">
    <q-inner-loading :showing="isLoading" label="Please wait..." />
    <template v-if="!isLoading">
      <div class="dashboard__header">
        <div class="title">Order No. #{{ makeNumber3Digits(orderNumber) }}</div>
        <div class="date">{{ dateAndTime }}</div>
      </div>
      <div class="dashboard__filter">
        <q-input
          v-model="itemCode"
          filled
          bg-color="white"
          label="Enter UPC Number"
          readonly
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="dashboard__main">
        <product-list-component
          @click-product="addToCart"
        ></product-list-component>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.dashboard {
  position: relative;
  min-height: calc(100vh - 98px);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
      color: $primary-text;
    }
    .date {
      font-size: 1rem;
      font-weight: 400;
      color: $secondary-text;
    }
  }
  &__main {
    margin-top: 15px;
    .count {
      font-size: 1rem;
      font-weight: 400;
      text-align: right;
      margin-bottom: 5px;
      color: $secondary-text;
    }
    .product-list-component {
      height: calc(100vh - 253px);
      overflow-y: auto;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { api } from 'boot/axios';
import ProductListComponent from 'components/ProductListComponent.vue';
import { Notify } from 'quasar';
import ErrorHandler from 'src/helpers/error';
import { Product, ProductResponse } from './models';

export default defineComponent({
  name: 'DashboardComponent',
  components: { ProductListComponent },
  setup(props, context) {
    /** State */
    const isLoading = ref<boolean>(true);
    const itemCode = ref<string>('');
    const dateAndTime = ref<string>(new Date().toLocaleString());
    const orderNumber = ref<number>(1);

    // function make number 3 digits
    const makeNumber3Digits = (number: number) => {
      if (number < 10) {
        return `00${number}`;
      }
      if (number < 100) {
        return `0${number}`;
      }
      return number;
    };

    /** Product */
    const addToCart = (product: Product) => {
      context.emit('add-to-cart', product);
    };

    /** Barcode */
    const onBarcodeScannerInput = async (e) => {
      if (e.key === 'Enter') {
        const upc = itemCode.value;
        itemCode.value = '';
        try {
          const product: ProductResponse = await api
            .get(`/api/v1/products/upc/${upc}`)
            .then((response) => response.data);
          if (product) {
            addToCart(
              new Product({
                id: product._id,
                name: product.name,
                price: product.price,
                upc: product.upc,
                image: product.image,
                stock: product.countInStock,
                quantity: 1,
              })
            );
          }
        } catch (error) {
          Notify.create({
            message: 'Product not found',
            color: 'negative',
            position: 'top',
          });
        }
      } else if (e.key.match(/^[0-9]+$/)) {
        itemCode.value += e.key;
      }
    };
    // detect barcode scanner input
    document.addEventListener('keydown', onBarcodeScannerInput);
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onBarcodeScannerInput);
    });

    onMounted(async () => {
      // get date and time
      setInterval(() => {
        dateAndTime.value = new Date().toLocaleString();
      }, 1000);

      // get order number from api
      try {
        await api.get('/api/v1/orders/number').then((res) => {
          orderNumber.value = res?.data?.number;
        });
      } catch (error) {
        if (error instanceof Error) ErrorHandler.handle(error);
      }

      isLoading.value = false;
    });

    return {
      isLoading,
      itemCode,
      dateAndTime,
      orderNumber,
      makeNumber3Digits,
      addToCart,
    };
  },
});
</script>
