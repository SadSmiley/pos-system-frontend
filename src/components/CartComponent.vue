<template>
  <div class="cart-component">
    <div class="cart-component__header">
      <div class="title">Cart</div>
      <div class="close">
        <q-btn @click="$emit('close')" icon="mdi-close" round flat />
      </div>
    </div>
    <div class="cart-component__main">
      <div class="items" v-if="products.length">
        <div v-for="product in products" :key="product.id" class="item">
          <div class="item__info">
            <div class="image">
              <q-btn @click="removeFromCart(product)" class="remove" unelevated icon="mdi-close"
              round />
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
                @click="product.adjustQuantity('minus')"
                flat
                label="-"
                round
              />
            </div>
            <input v-model="product.quantity" />
            <div>
              <q-btn
                @click="product.adjustQuantity('add')"
                flat
                label="+"
                round
              />
            </div>
          </div>
        </div>
      </div>
      <div class="items" v-else>
        <div class="empty">Your cart is empty.</div>
      </div>
      <div class="sticky">
        <div class="summary">
          <div class="summary__item">
            <div class="label">Sub Total</div>
            <div class="value">PHP {{ summary.subTotal.toFixed(2) }}</div>
          </div>
          <div class="summary__item">
            <div class="label">Tax</div>
            <div class="value">PHP {{ summary.tax.toFixed(2) }}</div>
          </div>
          <div class="summary__item">
            <div class="label">Total</div>
            <div class="value">PHP {{ summary.total.toFixed(2) }}</div>
          </div>
        </div>
        <div class="actions">
          <q-btn @click="checkout()" unelevated label="Checkout" color="primary" />
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
      padding-bottom: 126px;
      height: calc(100vh - 231px);
      overflow-y: auto;
      overflow: visible;
      .item {
        display: grid;
        grid-template-columns: auto 110px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        position: relative;
        overflow: visible;
        .item__info {
          display: grid;
          grid-template-columns: 50px auto;
          align-items: flex-start;
          column-gap: 15px;
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
            .remove {
              font-size: 5px;
              color: #fff;
              background-color: red;
              position: absolute;
              left: -5px;
              top: -5px;
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
      .empty {
        font-size: 1rem;
        font-weight: 500;
        color: $primary-text;
        text-align: center;
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
import { defineComponent, ref, computed } from 'vue';
import { Product } from 'components/models';
import { Loading, Notify } from 'quasar';
import { api } from 'boot/axios';
import ErrorHandler from 'src/helpers/error';

export default defineComponent({
  name: 'CartComponent',
  setup() {
    const products = ref<Product[]>([]);

    const addToCart = (product: Product) => {
      // dont allow if item is out of stock
      if (product.stock <= 0) {
        // show error
        Notify.create({
          message: `${product.name} is out of stock`,
          color: 'negative',
          position: 'top',
        });
        return;
      }

      const findProduct = products.value.find(
        (item) => item.id === product.id,
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        products.value.push(product);
      }

      Notify.create({
        message: `${product.name} added to cart`,
        color: 'positive',
        position: 'top',
      });
    };

    const removeFromCart = (product: Product) => {
      const findProduct = products.value.find(
        (item) => item.id === product.id,
      );
      if (findProduct) {
        findProduct.quantity -= 1;
        if (findProduct.quantity === 0) {
          products.value = products.value.filter(
            (item) => item.id !== product.id,
          );
        }
      }
    };

    const summary = computed(() => {
      const subTotal = products.value.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );
      const tax = 0;
      const total = subTotal + tax;
      return {
        subTotal,
        tax,
        total,
      };
    });

    const checkout = async () => {
      try {
        Loading.show({
          message: 'Checking out...',
        });
        await api.post('/api/v1/transactions/checkout', {
          products: products.value.map((product) => ({
            product_id: product.id,
            quantity: product.quantity,
          })),
        });
        Notify.create({
          message: `You have successfully checked out. Your total is PHP ${summary.value.total.toFixed(2)}`,
          color: 'positive',
          position: 'top',
        });
        products.value = [];
      } catch (error) {
        if (error instanceof Error) ErrorHandler.handle(error);
      } finally {
        Loading.hide();
      }
    };

    return {
      products,
      addToCart,
      summary,
      removeFromCart,
      checkout,
    };
  },
});
</script>
