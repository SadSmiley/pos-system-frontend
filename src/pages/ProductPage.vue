<template>
  <q-page padding>
    <div class="product-page">
      <div class="product-page__header">
        <div class="title">Product Page</div>
        <div class="actions">
          <q-btn
            color="primary"
            label="Add Product"
            icon="add"
            unelevated
            @click="addProduct()"
          />
        </div>
      </div>
      <div class="product-page__filter">
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
      <div class="product-page__main">
        <product-list-component
          ref="productListComponent"
        ></product-list-component>
      </div>
    </div>
    <!-- Create Dialog for ProductDialogComponent -->
    <q-dialog v-model="productDialog" full-width>
      <product-dialog-component
        v-if="productData"
        :product-data="productData"
        @close="productDialog = false"
        @reload="reloadData"
      ></product-dialog-component>
    </q-dialog>
    <!-- Create Dialog for Showing Price of Product -->
    <q-dialog v-model="priceDialog">
      <product-price-component
        v-if="productData"
        :product-data="productData"
        @close="priceDialog = false"
      ></product-price-component>
    </q-dialog>
  </q-page>
</template>

<style lang="scss">
.product-page {
  padding: 1rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
  }

  &__filter {
    margin-bottom: 1rem;
  }

  &__main {
  }
}
</style>

<script lang="ts">
// Plugins
import { defineComponent, ref, onBeforeUnmount, nextTick } from 'vue';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';

// Components
import ProductListComponent from 'components/ProductListComponent.vue';
import ProductDialogComponent from 'components/ProductDialogComponent.vue';
import ProductPriceComponent from 'components/ProductPriceComponent.vue';

// Models
import { Product, ProductResponse } from 'components/models';

export default defineComponent({
  name: 'ProductPage',
  components: {
    ProductListComponent,
    ProductDialogComponent,
    ProductPriceComponent,
  },
  setup() {
    const productDialog = ref<boolean>(false);
    const priceDialog = ref<boolean>(false);
    const productData = ref<Product>();
    const itemCode = ref<string>('');
    const addProduct = async (upc?: string) => {
      try {
        const product: ProductResponse = await api
          .get(`/api/v1/products/upc/${upc}`)
          .then((response) => response.data);
        if (product) {
          productData.value = new Product({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.countInStock,
            image: product.image,
            upc: product.upc,
          });
          priceDialog.value = true;
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
          productData.value = new Product({
            name: '',
            price: 0,
            quantity: 0,
            image: '',
            upc: upc || '',
          });
          if (productDialog.value) productDialog.value = false;
          nextTick(() => {
            productDialog.value = true;
          });
        } else {
          throw error;
        }
      }
    };

    const productListComponent =
      ref<InstanceType<typeof ProductListComponent>>(null);

    const reloadData = () => {
      if (productListComponent.value) productListComponent.value.loadData();
    };

    const onBarcodeScannerInput = (e) => {
      if (e.key === 'Enter') {
        const upc = itemCode.value;
        itemCode.value = '';
        addProduct(upc);
      } else if (e.key.match(/^[0-9]+$/)) {
        itemCode.value += e.key;
      }
    };

    document.addEventListener('keydown', onBarcodeScannerInput);
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onBarcodeScannerInput);
    });

    return {
      productDialog,
      priceDialog,
      addProduct,
      productData,
      productListComponent,
      reloadData,
      itemCode,
    };
  },
});
</script>
