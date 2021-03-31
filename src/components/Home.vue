<template>
  <b-container>
    <p>This is home page</p>
  </b-container>
</template>

<script>
export default {
name: "Home",
  data: () => ({
    authenticated: false,
    validUserName : ''
  }),
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (localStorage.getItem("isAuthenticates")
        && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
        this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      }
    }
  }
}
</script>

<style scoped>

</style>
