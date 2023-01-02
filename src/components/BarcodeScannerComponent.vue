<template>
  <div class="barcode-scanner-component">
    <div id="reader"></div>
  </div>
</template>

<style lang="scss">
.barcode-scanner-component {
  background-color: #fff;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default defineComponent({
  name: 'BarcodeScannerComponent',
  setup() {
    onMounted(() => {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      html5QrcodeScanner.render(
        (decodedText, decodedResult) => {
          alert(`Code matched = ${decodedText}`, decodedResult);
        },
        (error) => {
          console.warn(`Code scan error = ${error}`);
        }
      );

      onUnmounted(() => {
        html5QrcodeScanner.clear();
      });
    });

    return {};
  },
});
</script>
