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
      <div class="product-page__main">
        <product-list-component ref="productListComponent"></product-list-component>
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

  &__main {

  }
}
</style>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount } from 'vue';
import ProductListComponent from 'components/ProductListComponent.vue';
import ProductDialogComponent from 'components/ProductDialogComponent.vue';
import { Product } from 'components/models';

export default defineComponent({
  name: 'ProductPage',
  components: { ProductListComponent, ProductDialogComponent },
  setup() {
    const productDialog = ref<boolean>(false);
    const productData = ref<Product>();
    const addProduct = (upc?: string) => {
      productData.value = new Product({
        name: '',
        price: 0,
        quantity: 0,
        image: '',
        upc: upc || '',
      });
      productDialog.value = true;
    };

    const productListComponent = ref<InstanceType<typeof ProductListComponent>>(null);

    const reloadData = () => {
      if (productListComponent.value) productListComponent.value.loadData();
    };

    let itemCode = '';
    const onBarcodeScannerInput = (e) => {
      if (e.key === 'Enter') {
        const upc = itemCode;
        itemCode = '';
        addProduct(upc);
      } else if (e.key.match(/^[0-9]+$/)) {
        itemCode += e.key;
      }
    };

    document.addEventListener('keydown', onBarcodeScannerInput);
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onBarcodeScannerInput);
    });

    return {
      productDialog, addProduct, productData, productListComponent, reloadData,
    };
  },
});
</script>
