<template>
  <div class="cart-component">
    <div class="cart-component__header">
      <div class="title">Cart</div>
      <div class="close">
        <q-btn @click="$emit('close')" icon="mdi-close" round flat />
      </div>
    </div>
    <div class="cart-component__main">
      <div class="items">
        <div v-for="product in products" :key="product.id" class="item">
          <div class="item__info">
            <div class="image">
              <img :src="product.image" alt="Product Image" />
            </div>
            <div class="info">
              <div class="title">{{ product.name }}</div>
              <div class="price">PHP {{ product.price.toFixed(2) }}</div>
            </div>
          </div>
          <div class="item__quantity">
            <div>
              <q-btn
                @click="adjustQuantity(product, 'minus')"
                flat
                label="-"
                round
              />
            </div>
            <input v-model="product.quantity" />
            <div>
              <q-btn
                @click="adjustQuantity(product, 'add')"
                flat
                label="+"
                round
              />
            </div>
          </div>
        </div>
      </div>
      <div class="sticky">
        <div class="summary">
          <div class="summary__item">
            <div class="label">Sub Total</div>
            <div class="value">PHP 250.00</div>
          </div>
          <div class="summary__item">
            <div class="label">Tax</div>
            <div class="value">PHP 50.00</div>
          </div>
          <div class="summary__item">
            <div class="label">Total</div>
            <div class="value">PHP 300.00</div>
          </div>
        </div>
        <div class="actions">
          <q-btn unelevated label="Checkout" color="primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cart-component {
  background-color: #fff;
  padding: 25px;
  border-radius: 25px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  position: relative;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: $primary-text;
    }
    .close {
      .q-btn {
        background-color: rgba(252, 75, 75, 0.1);
        color: rgba(252, 75, 75, 1);
      }
    }
  }
  &__main {
    .items {
      padding-bottom: 150.56px;
      height: calc(100vh - 231px);
      overflow-y: auto;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        .item__info {
          display: flex;
          align-items: center;
          .image {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 1rem;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .info {
            .title {
              font-size: 1rem;
              font-weight: 500;
              color: $primary-text;
            }
            .price {
              font-size: 0.8rem;
              font-weight: 400;
              color: $secondary-text;
            }
          }
        }
        .item__quantity {
          width: 110px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          .q-btn {
            color: rgba(49, 129, 237);
            background-color: rgba(49, 129, 237, 0.1);
          }
          input {
            border: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .summary {
      margin-bottom: 1rem;
      .summary__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        .label {
          font-size: 0.8rem;
          font-weight: 400;
          color: $secondary-text;
        }
        .value {
          font-size: 0.8rem;
          font-weight: 500;
          color: $primary-text;
        }
      }
    }
    .actions {
      .q-btn {
        width: 100%;
      }
    }
    .sticky {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      right: 0;
      padding: 25px;
      background-color: #fff;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Product } from 'components/models';

export default defineComponent({
  name: 'CartComponent',
  setup() {
    const products = ref<Product[]>([
      {
        id: 1,
        name: 'Product #1',
        price: 25,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Product #2',
        price: 255,
        image: 'https://cdn.quasar.dev/img/mountains.jpg',
        quantity: 1,
      },
    ]);

    const adjustQuantity = (product: Product, type: 'add' | 'minus') => {
      if (type === 'add') product.quantity += 1;
      else if (type === 'minus' && product.quantity > 1) product.quantity -= 1;
    };

    return {
      products,
      adjustQuantity,
    };
  },
});
</script>
