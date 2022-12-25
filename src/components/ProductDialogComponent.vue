<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Add Product</div>
    </q-card-section>
    <q-form @submit.prevent="saveProduct">
      <q-card-section>

          <q-input
            v-model="product.name"
            label="Name"
            filled
            lazy-rules
            :rules="[val => val.length > 0 || 'Name is required']"
          />
          <q-input
            v-model="product.upc"
            type="number"
            label="UPC (Optional)"
            filled
            lazy-rules
            style="margin-bottom: 15px;"
          />
          <q-input
            v-model="product.price"
            label="Price"
            filled
            lazy-rules
            type="number"
            :rules="[val => val.length > 0 || 'Price is required']"
          />
          <q-input
            v-model="product.quantity"
            label="Quantity"
            filled
            lazy-rules
            type="number"
            :rules="[val => val.length > 0 || 'Quantity is required']"
          />

      </q-card-section>
      <q-card-actions align="right">
        <!-- close -->
        <q-btn
          flat
          label="Cancel"
          @click="$emit('close')"
        />
        <q-btn
          color="primary"
          label="Save"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Loading } from 'quasar';
import ErrorHandler from 'app/src/helpers/error';
import { Product } from './models';

export default defineComponent({
  name: 'ProductDialogComponent',
  props: {
    productData: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props, context) {
    const product = ref<Product>(props.productData);

    const saveProduct = async () => {
      try {
        Loading.show({
          message: 'Saving Product...',
        });
        await product.value.save();
        context.emit('close');
        context.emit('reload');
      } catch (error) {
        if (error instanceof Error) ErrorHandler.handle(error);
      } finally {
        Loading.hide();
      }
    };

    return {
      saveProduct,
      product,
    };
  },
});
</script>
