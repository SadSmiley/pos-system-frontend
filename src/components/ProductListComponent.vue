<template>
  <div class="product-list-component">
    <div class="product-list-component__row">
      <div v-for="index in 60" :key="index" class="item">
        <q-card flat bordered>
          <img
            class="item__image"
            src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-card-section>
            <div class="text-h6 item__title">Product #{{ index }}</div>
            <div class="text-subtitle2 item__subtitle">PHP 25.00</div>
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
      }
      &__subtitle {
        color: $secondary-text;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductListComponent',
});
</script>
