<template>
  <q-page padding>
    <div class="dashboard-page" :class="isCartOpen && 'cart-open'">
      <dashboard-component></dashboard-component>
      <cart-component v-if="isCartOpen" @close="toggleCart"></cart-component>
    </div>
    <q-page-sticky
      v-if="!isCartOpen"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn @click="toggleCart()" fab icon="mdi-cart" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss">
.dashboard-page {
  display: grid;
  &.cart-open {
    grid-template-columns: auto 350px;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DashboardComponent from 'components/DashboardComponent.vue';
import CartComponent from 'components/CartComponent.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: { DashboardComponent, CartComponent },
  setup() {
    const isCartOpen = ref<boolean>(true);
    const toggleCart = () => {
      isCartOpen.value = !isCartOpen.value;
    };

    return { toggleCart, isCartOpen };
  },
});
</script>
