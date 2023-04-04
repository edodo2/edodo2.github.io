const RenderHtmlApp = {
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
}
Vue.createApp(RenderHtmlApp).mount('#pictureapp');
