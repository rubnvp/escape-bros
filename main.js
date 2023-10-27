const KEY_ITEM = {
  id : 'key',
  name : 'Llave',
}

let ytPlayer = null;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('player', {
    width: '200',
    height: '160',
    videoId: '2yJBnxt94C0',
    playerVars: {
      'playsinline': 1
    },
    // events: {
    //   'onReady': onPlayerReady,
    //   'onStateChange': onPlayerStateChange
    // }
  });
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
    playTv() {
      ytPlayer?.playVideo();
    },
    pauseTv() {
      ytPlayer?.pauseVideo();
    },
    maximizeTv() {
      // ytPlayer?.playVideo();
      const iframe = document.querySelector('#player');
      var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
      if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
      }
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
  mounted() {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    // var player;
    
    // 4. The API will call this function when the video player is ready.
    // function onPlayerReady(event) {
    //   event.target.playVideo();
    // }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    // var done = false;
    // function onPlayerStateChange(event) {
    //   if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    //   }
    // }
    // function stopVideo() {
    //   player.stopVideo();
    // }
  }
});

app.mount("#app");
