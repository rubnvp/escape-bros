const KEY_ITEM = {
  id : 'key',
  name : 'Llave',
}

const app = Vue.createApp({
  data: () => ({
    inventoryItems: [],
  }),
  methods: {
    keyLook() {
      window.alert("Es una llave, parece que es de una puerta...");
    },
    keyPick() {
      window.alert("Has recogido la llave");
      this.inventoryItems.push(KEY_ITEM);
    },
    doorLook() {
      window.alert("Es una puerta con un candado, parece que está cerrrada...");
    },
    doorOpen() {
      if (this.isKeyAvailable) {
        window.alert("Has abierto la puerta, ¡enhorabuena!");
      }
      else {
        window.alert("Vaya, parece que está cerrada ☹️");
      }
    }
  },
  computed: {
    isKeyAvailable() {
      return this.inventoryItems.includes(KEY_ITEM);
    }
  }
});

app.mount("#app");
