const KEY_ITEM = {
  id : 'key',
  name : 'Llave',
}

const app = Vue.createApp({
  data: () => ({
    // timeLeft: 60 * 5, // 5 minutes
    notification: '',
    notificationId: 0,
    inventoryItems: [],
    safeBoxCombination: '',
    isSafeBoxOpen: false,
  }),
  methods: {
    notify(text) {
      this.notification = text;
      clearTimeout(this.notificationId);
      this.notificationId = setTimeout(() => this.notification = '', 5000);
    },
    trySafeBoxCombination() {
      if (this.safeBoxCombination === 1234) {
        this.isSafeBoxOpen = true;
        this.notify("¡Enhorabuena, has abierto la caja fuerte!");
      }
      else {
        this.notify("Vaya, parece que la combinación es incorrecta ☹️");
      }
    },
    keyLook() {
      this.notify("Es una llave, parece que es de una puerta...");
    },
    keyPick() {
      this.notify("Has recogido la llave");
      this.inventoryItems.push(KEY_ITEM);
    },
    doorLook() {
      this.notify("Es una puerta con un candado, parece que está cerrrada...");
    },
    doorOpen() {
      if (this.isKeyInInventory) {
        if (window.confirm("¿Quieres usar la llave?")) {
          this.notify("Has abierto la puerta, ¡enhorabuena! 🎉");
          return;
        }
      }
      this.notify("Vaya, parece que está cerrada ☹️");
    },
    speech(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  },
  computed: {
    isKeyInInventory() {
      return this.inventoryItems.includes(KEY_ITEM);
    }
  },
  // mounted() {
  //   setInterval(() => {
  //     if (this.timeLeft % 10 === 0) this.speech(`Quedan ${this.timeLeft} segundos`);
  //     else if (this.timeLeft === 0) {
  //       alert("¡Se ha acabado el tiempo! Has perdido ☹️");
  //       location.reload();
  //     }
  //     this.timeLeft--;
  //   }, 1000);
  // }
});

app.mount("#app");
