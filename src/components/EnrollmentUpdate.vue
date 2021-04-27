<template>
    <b-container>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-card v-if="showMsg != ''" style="{color : red}" class=" text-center bg-light">
              <p>{{ showMsg }}</p></b-card>
          </b-col>
        </b-row>
        <b-row v-if="showMsg == ''" class="mt-4 bg-light rounded p-5">
          <b-col>
            <b-row>
              <b-col>
                <p class="h3 text-center">Student Profile</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <strong>Student Name:</strong>
                {{ $data.studentInfo.name }}
              </b-col>
            </b-row>
            <b-row>
              <b-col><strong>Student NUID:  </strong>{{ $data.studentInfo.nuid }}</b-col>
            </b-row>
            <b-row>
              <b-col><strong>Student Email: </strong> {{ $data.studentInfo.email }}</b-col>
            </b-row>
            <b-row>
              <b-col><strong>Student Cell Phone:  </strong>{{ $data.studentInfo.cell_phone }}</b-col>
            </b-row>

            <b-row>
              <b-col><strong>Start Date: </strong> {{ (new Date($data.studentInfo.start_date)).toLocaleString("en-US", {timeZone: 'UTC', month:'long', year :'numeric', day:'2-digit'}) }}</b-col>
            </b-row>
            <b-row>
              <b-col><strong>Expected Graduation Date: </strong>{{ (new Date($data.studentInfo.graduation_date)).toLocaleString("en-US", {timeZone: 'UTC', month:'long', year :'numeric', day:'2-digit'})  }}</b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

<form class="justify-content-center mt-5" v-if="showMsg == ''" >
    <!-- <div>
        <label for="">Course:</label>
        <input :disabled="disable" type="text" v-model= "form.course.course_name" /> {{form.course}}
    </div>
    <div>
        <label for="">Student:</label>
        <input :disabled="disable" type="text" v-model="form.student"/>
    </div> -->
    <b-row>
      <b-col>
        <b-form-group
          id="semester-field"
          label="Semester *"
          description="example: Summer 2021"
          label-for="semester"
          label-cols-sm="3"
          label-cols-lg="2"
        >
          <b-form-input
            id="semester"
            :disabled="completeStatus"
            type="text"
            :state="states.semesterState"
            v-model="form.semester_name"
            @change="states.semesterState = validateSemester()"
            :trim="Boolean(1)"
          ></b-form-input>
          <b-form-invalid-feedback id="semesterInvalidText">
            Please enter a valid Semester
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="status-field"
            label="Status *"
            label-for="status"
            label-cols-sm="3"
            label-cols-lg="2"
          >
            <b-form-input
              id="status"
              disabled
              type="text"
              v-model="form.status"
              :trim="Boolean(1)"
            ></b-form-input>
          </b-form-group>
<!--            <label >Status:</label>-->
<!--            <input  :disabled="disable" type="text" v-model="form.status"/>-->
        </b-col>
      </b-row>
  <b-row>
        <b-col v-if = "form.status !== 'Planned'">
          <b-form-group
            id="grade-field"
            label="Grade *"
            label-for="grade"
            label-cols-sm="3"
            label-cols-lg="2"
          >
            <b-form-input
              id="grade"
              type="text"
              v-model="form.grade"
              :placeholder="$data.form.grade"
              :trim="Boolean(1)"
              :state="states.gradeState"
              @change="states.gradeState = validateGrade()"
              required
            ></b-form-input>
            <b-form-invalid-feedback id="nameInvalidText">
              Please enter a valid grade
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
  <b-row class="float-right">
    <b-col>
        <b-button class="btn-primary" @click="OnSubmit()">Submit</b-button>
      </b-col>
  </b-row>

</form>
</b-container>
</template>

<script>
import {APIService} from '../http/APIServices';
import axios from 'axios';
const apiService = new APIService();
export default {
  data() {
    return {
     form:{},
     showMsg: '',
     disable: false,
     studentInfo: {},
      states :{
        semesterState : null,
        gradeState: null,
      },
    };
  },
  created(){
      this.enrollmentEdit();
      this.getStudentInfo();
  },
methods: {
    validateSemester(){
      let validation = true;
      if(this.$data.form.semester_name === null){
        validation = false;
      }
      return validation;
    },
    validateGrade(){
      let validation = true;
      if(this.$data.form.grade === null && this.$data.form.status === 'Completed'){
        validation = false;
      }
      return validation;
    },
    enrollmentEdit() {
        this.disable = false;
        console.log(this.$route.params.enrollmentID);
         apiService.getEnrollment(this.$route.params.enrollmentID).then((res) => {
        this.form = res.data.data;
        if(this.form.status === 'Planned'){
            this.disable = true;
        }
        else if(this.form.status === 'Completed'){
            this.disable = true;
        }
      }).catch(e => {
          console.log(e)
          if(e.message.includes("404")){
            this.showMsg = "No Records found for emrollment ID " + this.$route.params.enrollmentID;
          }else if(e.message.includes("403")) {
            this.showMsg = "You are not authorized to perform this action.";
          }else {
            this.showMsg = e.message;
          }
        }
      )
    },
     getStudentInfo() {
      apiService.getStudentInfo(this.$route.params.studentID).then((res) => {
        this.studentInfo = res.data.data;
      }).catch(e => {
          console.log(e)
          if(e.message.includes("404")){
            this.showMsg = "No Records found for Student ID " + this.$route.params.studentID;
          } else if(e.message.includes("403")) {
            this.showMsg = "You are not authorized to perform this action.";
          }else {
            this.showMsg = e.message;
          }
        }
      )
    },
    OnSubmit(){
        if(this.validateSemester() && this.validateGrade()) {
          apiService.updateEnrollment(this.$route.params.enrollmentID, this.$data.form).then(response => {
            if (response.status === 200) {
              console.log('saveupdating' + response.data)
              this.$data.form = response.data;
              this.$router.go(-1);
            } else {
              this.showMsg = "No courses remaining";
            }
          }).catch(error => {
            if (error.response.status === 401) {
              this.showMsg = "error";
            } else if (error.response.status === 400) {
              this.showMsg = "error";
            } else if (error.response.status === 403) {
              this.showMsg = "You are not authorized to perform this action.";
            }
          });
        }
    }
},
computed: {
    completeStatus(){
        if(this.form.status === 'Completed'){
             return true;
        }
       else{
           return false;
       }
    }
 }
}
</script>
