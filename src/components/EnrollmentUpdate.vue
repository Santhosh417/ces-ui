<template>
    <b-container>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <p class="h3 text-center">Student Profile</p>
          </b-col>
        </b-row>
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
    
<form class="justify-content-center" @submit.prevent="OnSubmit">
    <!-- <div> 
        <label for="">Course:</label>
        <input :disabled="disable" type="text" v-model= "form.course.course_name" /> {{form.course}}
    </div>
    <div>
        <label for="">Student:</label>
        <input :disabled="disable" type="text" v-model="form.student"/>
    </div> -->
    <div class="form-row">
        <div class="col">
            <label for="">Semester name:</label>
            <input  :disabled="completeStatus" type="text" v-model="form.semester_name"/>
        </div>
        <div class="col">
            <label for="">Status:</label>
            <input  :disabled="disable" type="text" v-model="form.status"/>
        </div>
        <div class="col" v-if = "form.status !== 'planned'">
            <label for="">Grade:</label>
            <input  type="text" v-model="form.grade">
        </div>
        <button class="btn btn-primary mb-2">Submit</button>
    </div>
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
     studentInfo: {}
    };
  },
  created(){
      this.enrollmentEdit();
      this.getStudentInfo();
  },
methods: {
    enrollmentEdit() {
        this.disable = false;
        console.log(this.$route.params.enrollmentID);
         apiService.getEnrollment(this.$route.params.enrollmentID).then((res) => {
        this.form = res.data.data;
        if(this.form.status === 'planned'){
            this.disable = true;
        }
        else if(this.form.status === 'completed'){
            this.disable = true;
        }
      }).catch(e => {
          console.log(e)
          if(e.message.includes("404")){
            this.showMsg = "No Records found for emrollment ID " + this.$route.params.enrollmentID;
          } else {
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
          } else {
            this.showMsg = e.message;
          }
        }
      )
    },
    OnSubmit(){
        console.log('hih fjl');
        apiService.updateEnrollment(this.$route.params.enrollmentID, this.$data.form).then(response => {
          if (response.status === 200) {
            console.log('saveupdating'+response.data)
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
          }
        });
    }
},
computed: {
    completeStatus(){
        if(this.form.status === 'completed'){
             return true;
        }
       else{
           return false;
       }
    }
 }
}
</script>
