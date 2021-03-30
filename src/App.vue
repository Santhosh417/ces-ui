<template>
  <div>
    <div>
      <b-container fluid class="unocmsHeader">
        <div>
          <slot></slot>
        </div>
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
          <b-col v-if="localStorage != undefined && localStorage.getItem('isAuthenticates')" cols="1" class="mt-3 ml-5">
            <b-dropdown right :text="localStorage.getItem('log_user')" class="float-right">
              <b-dropdown-item>Log out</b-dropdown-item>
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
      <router-view/><!--:key="$route.fullPath"-->
    </div>
  </div>

<!--  <v-app>-->
<!--    <v-app-bar-->
<!--      color="#000000"-->
<!--      dark-->
<!--      prominent-->
<!--      height="200"-->
<!--    >-->
<!--        <v-row>-->
<!--          <v-col cols="2">-->
<!--            <img :src="require('@/assets/images/university-o.png')" height="100" class="mt-5"/>-->
<!--          </v-col>-->
<!--          <v-col cols="9">-->
<!--            <v-row>-->
<!--              <v-toolbar-title color="White">UNIVERSITY OF NEBRASKA OMAHA</v-toolbar-title>-->
<!--            </v-row>-->
<!--            <v-row>-->
<!--              <template>-->
<!--                <v-toolbar-title align-with-title>Course Enrollment System</v-toolbar-title>-->
<!--              </template>-->
<!--          </v-row>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-btn @click="login" class="mt-16">Login</v-btn>-->
<!--      <template v-slot:extension>-->
<!--        <v-tabs style="float:right">-->
<!--          <v-tab>About</v-tab>-->
<!--          <v-tab>Academics</v-tab>-->
<!--          <v-tab>Contact us</v-tab>-->
<!--        </v-tabs>-->
<!--      </template>-->
<!--    </v-app-bar>-->
<!--    <v-content>-->
<!--      <router-view/>-->
<!--    </v-content>-->
<!--  </v-app>-->
</template>
<script>
import router from './router';
export default {

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
