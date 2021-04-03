<template>
  <b-container>
    <b-row>
      <b-col cols="6" offset="3">
        <b-row>
          <b-col>
            <p class="h3 text-center" >Search Student</p>
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
                    :description="'Enter student id'"
                    :label="'Student ID'"
                    label-for="studentID"
                  >

                    <b-form-input
                      id="studentID"
                      v-model="$data.studentID"
                      name="studentID"
                      :state="this.$data.studentIDValid"
                      ref="studentID"
                      aria-describedby="studentIDInvalidFeedback"
                      :trim="Boolean(1)"
                      @change="$data.studentIDValid = validateStudentID()"
                      required
                    ></b-form-input>
                    <b-form-invalid-feedback id="usernameInvalidFeedback">
                      {{ this.$data.usernameInvalidText }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </form>
                <b-button class="float-right" variant="primary" :to="{ name: 'student', params: {studentID: $data.studentID}}">Get Student</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {APIService} from '../http/APIServices';
const apiService = new APIService();
export default {
  name: 'Home',
  data(){ return {
    credentials: {},
    studentID: null,
    studentIDValid: null,
    studentIDInvalidText: '',
    valid: true,
    showMsg: '',
    loading: false,
    rules: {
      studentID: [
        v => !!v || "Student ID is required",
        v => (v && v.length > 3) || "A username must be more than 3 characters long",
        v => /^[0-9_]+$/.test(v) || "A username can only contain digits only"
      ]
    },
  }
  },

  methods: {
    // getStudentInfo() {
    //   this.loading = true;
    //   apiService.getStudentInfo(this.studentID).then((res)=>{
    //     console.log(res)
    //     localStorage.setItem('student_info', res, res.data);
    //     //router.push("/");
    //     //router.go(-1);
    //     window.location = "/student/:student"
    //   }).catch(e => {
    //     console.log(e)
    //
    //     this.loading = false;
    //     localStorage.removeItem('student_info');
    //     // router.go(-1);
    //     this.showMsg = 'No Student Found';
    //   })
    // },
    validateStudentID() {
      if (this.$data.studentID != null && this.$data.studentID.match(/^[0-9_]+$/)) {
        this.$data.studentIDInvalidText = '';
        // this.$data.credentials.username = this.$data.username
        return true;
      }
      this.$data.emailInvalidText = 'Please enter a valid Student ID'
      return false;
    }
  }
}
</script>

<style scoped>

</style>
