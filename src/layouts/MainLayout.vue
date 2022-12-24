<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          POS App
        </q-toolbar-title>

        <div>POS v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Dashboard',
    caption: 'Go to your dashboard',
    icon: 'dashboard',
    link: '/dashboard',
  },
  {
    title: 'Orders',
    caption: 'View your orders',
    icon: 'shopping_cart',
    link: '/orders',
  },
  {
    title: 'Products',
    caption: 'View your products',
    icon: 'shopping_basket',
    link: '/products',
  },
  {
    title: 'Customers',
    caption: 'View your customers',
    icon: 'people',
    link: '/customers',
  },
  {
    title: 'Settings',
    caption: 'View your settings',
    icon: 'settings',
    link: '/settings',
  },
  {
    title: 'Help',
    caption: 'Get help',
    icon: 'help',
    link: '/help',
  },
  {
    title: 'Logout',
    caption: 'Logout from your account',
    icon: 'logout',
    link: '/logout',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
