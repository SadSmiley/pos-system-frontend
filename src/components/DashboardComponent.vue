<template>
  <div class="dashboard q-pa-md">
    <div class="dashboard__header">
      <div class="title">Order No. #005</div>
      <div class="date">Mon, 23 July 2019, 02:34 AM</div>
    </div>
    <div class="dashboard__filter">
      <q-input
        v-model="itemCode"
        filled
        bg-color="white"
        label="Enter Item Code"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="dashboard__main">
      <product-list-component></product-list-component>
    </div>
  </div>
</template>

<style lang="scss">
.dashboard {
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
import { defineComponent, ref } from 'vue';
import ProductListComponent from 'components/ProductListComponent.vue';

export default defineComponent({
  name: 'DashboardComponent',
  components: { ProductListComponent },
  setup() {
    const itemCode = ref<string>('');

    return {
      itemCode,
    };
  },
});
</script>
