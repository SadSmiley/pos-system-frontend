<template>
  <q-page padding>
    <div class="dashboard-page">
      <dashboard-component></dashboard-component>
      <cart-component></cart-component>
    </div>
  </q-page>
</template>

<style lang="scss">
.dashboard-page {
  display: grid;
  grid-template-columns: auto 350px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardComponent from 'components/DashboardComponent.vue';
import CartComponent from 'components/CartComponent.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: { DashboardComponent, CartComponent },
});
</script>
