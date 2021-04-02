<template>
  <div>
    <b-table-simple hover small caption-top responsive>
      <caption>Student Profile:</caption>
      <colgroup><col><col></colgroup>
      <colgroup><col><col><col></colgroup>
      <colgroup><col><col></colgroup>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th colspan="2">Region</b-th>
          <b-th colspan="3">Clothes</b-th>
          <b-th colspan="2">Accessories</b-th>
        </b-tr>
        <b-tr>
          <b-th>Country</b-th>
          <b-th>City</b-th>
          <b-th>Trousers</b-th>
          <b-th>Skirts</b-th>
          <b-th>Dresses</b-th>
          <b-th>Bracelets</b-th>
          <b-th>Rings</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-th rowspan="3">Belgium</b-th>
          <b-th class="text-right">Antwerp</b-th>
          <b-td>56</b-td>
          <b-td>22</b-td>
          <b-td>43</b-td>
          <b-td variant="success">72</b-td>
          <b-td>23</b-td>
        </b-tr>
        <b-tr>
          <b-th class="text-right">Gent</b-th>
          <b-td>46</b-td>
          <b-td variant="warning">18</b-td>
          <b-td>50</b-td>
          <b-td>61</b-td>
          <b-td variant="danger">15</b-td>
        </b-tr>
        <b-tr>
          <b-th class="text-right">Brussels</b-th>
          <b-td>51</b-td>
          <b-td>27</b-td>
          <b-td>38</b-td>
          <b-td>69</b-td>
          <b-td>28</b-td>
        </b-tr>
        <b-tr>
          <b-th rowspan="2">The Netherlands</b-th>
          <b-th class="text-right">Amsterdam</b-th>
          <b-td variant="success">89</b-td>
          <b-td>34</b-td>
          <b-td>69</b-td>
          <b-td>85</b-td>
          <b-td>38</b-td>
        </b-tr>
        <b-tr>
          <b-th class="text-right">Utrecht</b-th>
          <b-td>80</b-td>
          <b-td variant="danger">12</b-td>
          <b-td>43</b-td>
          <b-td>36</b-td>
          <b-td variant="warning">19</b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot>
        <b-tr>
          <b-td colspan="7" variant="secondary" class="text-right">
            Total Rows: <b>5</b>
          </b-td>
        </b-tr>
      </b-tfoot>
    </b-table-simple>
  </div>

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
