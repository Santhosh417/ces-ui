<template>
  <b-container>
    <b-row>
      <b-col cols="6" offset="3">
        <b-row>
          <b-col>
            <p class="h3 text-center" >Login</p>
          </b-col>
        </b-row>
        <b-row class="mt-4 bg-light rounded p-5">
          <b-col>
            <b-row>
              <b-col>
                <form>
                  <p v-if="showMsg != ''" style="color: red">{{showMsg}}</p>
                  <b-form-group
                    id="group0"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :description="'Enter your username'"
                    :label="'Username'"
                    label-for="username"
                  >

                    <b-form-input
                      id="email"
                      v-model="$data.username"
                      name="username"
                      :state="this.$data.usernameValid"
                      ref="email"
                      aria-describedby="usernameInvalidFeedback"
                      :trim="Boolean(1)"
                      @change="$data.usernameValid = validateUsername()"
                      required
                    ></b-form-input>
                    <b-form-invalid-feedback id="usernameInvalidFeedback">
                      {{ this.$data.usernameInvalidText }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group
                    id="group1"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    :description="'Enter your password'"
                    :label="'Password'"
                    label-for="password"
                  >
                    <b-form-input
                      id="password"
                      v-model="$data.password"
                      name="password"
                      type="password"
                      :state="this.$data.passwordValid"
                      ref="password"
                      aria-describedby="passwordInvalidFeedback"
                      :trim="Boolean(1)"
                      @change="$data.passwordValid = validatePassword()"
                      required
                    ></b-form-input>
                    <b-form-invalid-feedback id="passwordInvalidFeedback">
                      {{ this.$data.passwordInvalidText }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </form>
                <b-button class="float-right" variant="primary" @click="login">Log in</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>

</template>
<script>
import router from '../router';
import {APIService} from '../http/APIServices';
const apiService = new APIService();
export default {
  name: 'Login',
  data: () => ({
    credentials: {},
    username: null,
    usernameValid: null,
    usernameInvalidText: '',
    password: null,
    passwordValid: null,
    passwordInvalidText: '',
    valid: true,
    showMsg: '',
    loading: false,
    rules: {
      username: [
        v => !!v || "Username is required",
        v => (v && v.length > 3) || "A username must be more than 3 characters long",
        v => /^[a-z0-9_]+$/.test(v) || "A username can only contain letters and digits"
      ],
      password: [
        v => !!v || "Password is required",
        v => (v && v.length > 7) || "The password must be longer than 7 characters"
      ]
    },
    showPassword: false,
  }),
  methods: {
    login() {
        this.loading = true;
        apiService.authenticateLogin(this.credentials).then((res)=>{
          console.log(res)
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('isAuthenticates', JSON.stringify(true));
          localStorage.setItem('log_user', JSON.stringify(this.credentials.username));
          //router.push("/");
          //router.go(-1);
          window.location = "/"
        }).catch(e => {
          console.log(e)

          this.loading = false;
          localStorage.removeItem('isAuthenticates');
          localStorage.removeItem('log_user');
          localStorage.removeItem('token');
          // router.go(-1);
          this.showMsg = 'Invalid Credentials. Please enter a valid username & password';
        })
    },
    validateUsername() {
      if (this.$data.username != null && this.$data.username.length > 3 && this.$data.username.match(/^[a-z0-9_]+$/)) {
        this.$data.usernameInvalidText = '';
        this.$data.credentials.username = this.$data.username
        return true;
      }
      this.$data.emailInvalidText = 'Please enter a valid username'
      return false;
    },
    validatePassword() {
      if(this.$data.password != null && this.$data.password.length > 7) {
          this.$data.passwordInvalidText = '';
          this.$data.credentials.password = this.$data.password
          return true;
      }
      this.$data.passwordInvalidText = 'Please enter a valid password'
      return false;
    }
  }
}
</script>
