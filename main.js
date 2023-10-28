const KEY_ITEM = {
  id : 'key',
  name : 'Llave 🗝️',
}

let ytPlayer = null;

const app = Vue.createApp({
  data: () => ({
    isSwitchOn: false, // Turn this off
    notification: '',
    notificationId: 0,
    inventoryItems: [],
    safeBoxCombination: '',
    isSafeBoxOpen: false,
    isTvMaximized: false,
    isDoorOpen: false,
    // timeLeft: 60 * 5, // 5 minutes
  }),
  methods: {
    toggleSwitch() {
      this.isSwitchOn = !this.isSwitchOn;
      if (this.isSwitchOn) {
        this.notify("Has encendido la luz 💡");
      }
      else {
        this.notify("Has apagado la luz, puedes resolverlo a oscuras si quieres 😉");
      }
    },
    notify(text) {
      this.notification = text;
      clearTimeout(this.notificationId);
      this.notificationId = setTimeout(() => this.notification = '', 5000);
    },
    trySafeBoxCombination() {
      if (this.safeBoxCombination === 4321) {
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
      this.notify("Has recogido la llave, se ha añadido al inventario");
      this.inventoryItems.push(KEY_ITEM);
    },
    doorLook() {
      this.notify("Es una puerta con un candado, parece que está cerrrada...");
    },
    doorOpen() {
      if (this.isKeyInInventory) {
        if (window.confirm("¿Quieres usar la llave?")) {
          this.notify("Has abierto la puerta, ¡pitbull te da la enhorabuena! 🎉");
          this.isDoorOpen = true;
          this.isSwitchOn = true;
          return;
        }
      }
      this.notify("Vaya, parece que está cerrada ☹️");
    },
    seeTv() {
      this.notify("Es una televisión, parece que está invertida... ¿echarán algo interesante?");
    },
    playTv() {
      ytPlayer?.playVideo();
    },
    pauseTv() {
      ytPlayer?.pauseVideo();
    },
    maximizeTv() {
      const iframe = document.querySelector('#player');
      var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
      if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
        iframe.classList.add('maximized');
      }
    },
    // speech(text) {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   utterance.lang = 'es-ES';
    //   window.speechSynthesis.speak(utterance);
    // }
  },
  computed: {
    isKeyInInventory() {
      return this.inventoryItems.includes(KEY_ITEM);
    }
  },
  mounted() {
    // This code loads the Youtube IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
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

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('player', {
    width: '200',
    height: '160',
    videoId: '2yJBnxt94C0',
    playerVars: {
      'playsinline': 1
    },
  });
}

app.mount("#app");