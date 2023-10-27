const app = Vue.createApp({
  data: () => ({
    message: "Hello from Vue!",
  }),
  methods: {
    lookDoor() {
      window.alert("Estás mirando una puerta");
    },
    interactDoor() {
      window.alert("Estás interactuando con una puerta");
    }
  }
});

app.mount("#app");
