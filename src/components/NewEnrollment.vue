<template>
 <b-container>
   <b-row>
     <b-col class="h4">
       Add Course Enrollment
     </b-col>
   </b-row>
   <b-row>
     <b-col cols="6">
       <b-form-group
         id="course-field"
         label="Course *"
         label-for="course"
         label-class="col-form-label"
         :state="$data.states.courseState"
       >
         <multi-select
           id="course"
           :multiple="false"
           label="course_name"
           v-model="$data.course"
           :options="$data.courses"
           track-by="id"
           :close-on-select="true"
           :state="$data.states.courseState"
           @change="$data.states.courseState = validateCourse()"
           @input="(input) => {
								this.$data.course = input;
								this.$data.form.course = input.id;
								this.validateCourse();
							}"
           placeholder="Select Course..."
         ></multi-select>
         <b-form-invalid-feedback :state="$data.states.courseState">
           Please select a course
         </b-form-invalid-feedback>
       </b-form-group>
     </b-col>
   </b-row>
   <b-row v-if="validateCourse()">
     <b-col>
     <b-row>
     <b-col>
       Course Id : {{$data.course.course_id}}
     </b-col>
     </b-row>
     <b-row>
       <b-col>
         Professor : {{$data.course.professor}}
       </b-col>
     </b-row>
     <b-row>
       <b-col>
         Course Program : {{$data.course.program}}
       </b-col>
     </b-row>
     <b-row>
       <b-col>
         Course Type : {{$data.course.course_type}}
       </b-col>
     </b-row>
     <b-row>
       <b-col>
         Course Credits : {{$data.course.credits}}
       </b-col>
     </b-row>
     </b-col>
   </b-row>
   <b-row>
     <b-col>
       <b-form-group
         id="start-date-field"
         label="Start Date *"
         label-for="start-date"
         label-class="col-form-label"
         :state="$data.states.startDateState"
       >
         <b-form-datepicker
           id="start-date"
           v-model="$data.form.start_date"
           name="start-date"
           ref="start-date"
           :state="$data.states.startDateState"
           @input="$data.states.startDateState = validatedStartDate()"
         ></b-form-datepicker>
         <b-form-invalid-feedback :state="$data.states.startDateState">
           Please enter a valid date.
         </b-form-invalid-feedback>
       </b-form-group>
     </b-col>
     <b-col>
       <b-form-group
         id="end-date-field"
         label="End Date *"
         label-for="end-date"
         label-class="col-form-label"
         :state="$data.states.endDateState"
       >
         <b-form-datepicker
           id="end-date"
           v-model="$data.form.end_date"
           name="end-date"
           ref="end-date"
           :min="$data.form.start_date"
           :state="$data.states.endDateState"
           @input="$data.states.endDateState = validatedEndDate()"
         ></b-form-datepicker>
         <b-form-invalid-feedback :state="$data.states.endDateState">
           Please enter a valid date.
         </b-form-invalid-feedback>
       </b-form-group>
     </b-col>
   </b-row>
   <b-row>
     <b-col cols="6">
       <b-form-group
         id="semester-field"
         label="Semester *"
         label-for="semester"
         label-class="col-form-label"
         :state="$data.states.semesterState"
       >
         <multi-select
           id="semester"
           :multiple="false"
           label="text"
           v-model="$data.semester"
           :options="$data.semesters"
           track-by="id"
           :close-on-select="true"
           :state="$data.states.semesterState"
           @change="$data.states.semesterState = validateSemester()"
           @input="(input) => {
								this.$data.semester = input;
								this.$data.form.semester_name = input.text;
								this.validateSemester();
							}"
           placeholder="Select Enrollment Semester..."
         ></multi-select>
         <b-form-invalid-feedback :state="$data.states.semesterState">
           Please select a semester to enroll for this course
         </b-form-invalid-feedback>
       </b-form-group>
     </b-col>
   </b-row>
   <b-row>
     <b-col >
       <div class="float-right">
         <b-button class="btn-primary" @click="submit">
           Enroll
         </b-button>
         <b-button @click="reset">
           Reset
         </b-button>
       </div>
     </b-col>
   </b-row>
 </b-container>
</template>

<script>
import {APIService} from '../http/APIServices';
const apiService = new APIService();
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Vue from 'vue'
Vue.component('multi-select', Multiselect);
export default {
name: 'NewEnrollment',
  data() {
  return{
    course : null,
    courses : '',
    showMsg : '',
    semesters: [
      { value: 1, text: "Summer 2021" },
      { value: 2, text: "Fall 2021" },
      { value: 3, text: "Spring 2022" },
      { value: 4, text: "Summer 2022" },
    ],
    semester : null,
    form: {
      course : '',
      student : '',
      start_date : '',
      end_date : '',
      semester_name : '',
      status : '',
    },
    states :{
      courseState : null,
      startDateState : null,
      endDateState : null,
      semesterState : null,
    },
  }
  },
  methods: {
    validateCourse(){
      let validation = true;
      if(this.$data.course === null){
        validation = false;
      }
      return validation;
    },
    validatedStartDate(){
        return this.$data.form.start_date != null;
    },
    validatedEndDate(){
      return this.$data.form.end_date != null;
    },
    validateSemester(){
      let validation = true;
      if(this.$data.form.semester_name === null){
        validation = false;
      }
      return validation;
    },
    reset(){
      this.$data.course = null;
      this.$data.semester = null;
      this.$data.form.course = '';
      this.$data.form.student = '';
      this.$data.form.start_date = '';
      this.$data.form.end_date = '';
      this.$data.form.semester_name = '';
      this.$data.form.status = '';
      this.$data.states.courseState  = null;
      this.$data.states.startDateState  = null;
      this.$data.states.endDateState  = null;
      this.$data.states.semesterState  = null;
    },
    submit(){
      if(this.validateCourse() && this.validatedStartDate() && this.validatedEndDate() && this.validateSemester()){
        this.$data.form.status = "Planned"
        this.$data.form.student = this.$route.params.studentID
        this.$data.form.course = this.$data.course.pk
        apiService.addEnrollment(this.$data.form).then(response => {
          if (response.status === 201) {
            console.log(response.data)
            this.$data.courses = response.data;
            window.location = "/"
          }else{
            this.showMsg = "No courses remaining";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            this.showMsg = "error";
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    }
  },
  mounted(){
    apiService.getCourses(this.$route.params.studentID).then(response => {
      if (response !== null) {
        console.log(response.data)
        this.$data.courses = response.data;
      }else{
        this.showMsg = "No courses remaining";
      }
    }).catch(error => {
      if (error.response.status === 401) {
        this.showMsg = "error";
      }else if (error.response.status === 400) {
        this.showMsg = "error";
      }
    });
  }
}
</script>

<style scoped>

</style>
