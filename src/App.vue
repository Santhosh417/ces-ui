<template>
  <div>
    <div>
      <b-container fluid class="unocmsHeader">
        <b-row>
          <b-col cols="1" class="mr-5">
            <img :src="require('@/assets/images/university-o.png')" height="100"/>
          </b-col>
          <b-col cols="9" class="mt-3">
            <b-row>
              <p class="h3">UNIVERSITY OF NEBRASKA OMAHA</p>
            </b-row>
            <b-row>
              <p class="h4">Course Management System</p>
            </b-row>
          </b-col>
          <b-col v-if="authenticated" cols="1" class="mt-3 ml-5">
            <b-dropdown right class="float-right" :text="validUserName" >
              <b-dropdown-item @click="logout">Log out</b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col v-else cols="1" class="mt-3 ml-5">
            <b-button :to="{ name: 'login' }" class="float-right">Log in</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="navigation-bar">
      <b-nav tabs align="right">
        <b-nav-item link-classes="navigation-bar" :to="{ name: 'aboutUs' }">About us</b-nav-item>
        <b-nav-item  link-classes="navigation-bar"  :to="{ name: 'alumni' }">Alumni</b-nav-item>
        <b-nav-item  link-classes="navigation-bar" :to="{ name: 'contactUs' }">Contact Us</b-nav-item>
      </b-nav>
    </div>
    <div>
      <router-view/>
    </div>
  </div>

</template>
<script>
import router from './router';
import {APIService} from "./http/APIServices";
const apiService = new APIService();
export default {
  data: () => ({
    authenticated: false,
    validUserName : ''
  }),
  mounted() {
    this.getUser();
  },
  methods:{
    logout() {
      localStorage.removeItem('isAuthenticates');
      localStorage.removeItem('log_user');
      localStorage.removeItem('token');
      this.authenticated = false;
      this.validUserName = '';
      window.location = "/"
    },
  // logout() {
  //   this.loading = true;
  //   apiService.logout().then((res) => {console.log(res);  window.location = "/"})
  // },
  getUser() {
    if (localStorage.getItem("isAuthenticates")
      && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
      this.authenticated = true;
      this.validUserName = JSON.parse(localStorage.getItem("log_user"));
    }
  }
}
  }

</script>
<style scoped>
.unocmsHeader {
  text-align: left;
  background-color: #000000;
  color:white;
  padding-top: 2rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
}
.noFocusOutline:focus {
  outline: none;
}

.navigation-bar{
  background-color: #000000;
  color:white;
}
</style>
