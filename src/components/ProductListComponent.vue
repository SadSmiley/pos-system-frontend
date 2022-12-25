<template>
  <div class="product-list-component">
    <div class="product-list-component__row">
      <div @click="onClickProduct(product)" v-for="(product, index) in productList" :key="index"
      class="item">
        <q-card flat bordered>
          <img
            class="item__image"
            :src="product.image"
          />
          <q-card-section>
            <div class="text-h6 item__title">{{ product.name }}</div>
            <div class="text-subtitle2 item__subtitle">PHP {{ product.formattedPrice }}</div>
            <div class="text-subtitle2 item__stock">Current Stock: {{ product.stock }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list-component {
  &__row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    row-gap: 25px;
    column-gap: 25px;
    .item {
      &__image {
        height: 200px;
        object-fit: cover;
      }
      &__title {
        color: $primary-text;
        line-height: 20px;
      }
      &__subtitle {
        color: $secondary-text;
        margin-top: 5px;
      }
      &__stock {
        color: $secondary-text;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import ErrorHandler from 'src/helpers/error';
import { Product, ProductResponse } from './models';

export default defineComponent({
  name: 'ProductListComponent',
  setup(props, context) {
    const productList = ref<Product[]>();

    const loadData = async () => {
      try {
        await api.get('/api/v1/products').then(({ data }) => {
          productList.value = data.map((product: ProductResponse) => {
            const productData = new Product({
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              upc: product.upc,
              stock: product.countInStock,
              quantity: 1,
            });
            return productData;
          });
        });
      } catch (error) {
        if (error instanceof Error) ErrorHandler.handle(error);
      }
    };

    const onClickProduct = (product: Product) => {
      context.emit('clickProduct', product);
    };

    onMounted(async () => {
      await loadData();
    });

    return { productList, loadData, onClickProduct };
  },
});
</script>
