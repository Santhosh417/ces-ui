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
    <div v-if="showMsg == ''">
<div v-if="$data.studentInfo.enrollments != null">
    <b-row class="mt-3" v-if="$data.studentInfo.enrollments.length > 0">
      <b-col>
      <download-csv
        class   = "float-right cursor-pointer"
        :data   = "$data.studentInfo.enrollments"
        :fields = "displayData"
        :labels = "labels"
        :name    =  "$data.studentInfo.nuid + '-' + $data.studentInfo.name+ '.csv'"
      >
        <b-button class="btn-primary"><b-icon icon="download"></b-icon>  Download Study Plan</b-button>
      </download-csv>
      </b-col>
    </b-row>
    <div>
      <b-table-simple v-if="showMsg == ''" hover small caption-top responsive>
        <caption><p class="h3">Enrollments:</p></caption>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Course</b-th>
            <b-th>Semester Name</b-th>
            <b-th>Start Date</b-th>
            <b-th>End Date</b-th>
            <b-th>Status</b-th>
            <b-th>Grade</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-if="$data.studentInfo.enrollments.length == 0">
            <b-td colspan="7" >No enrollment courses</b-td>
          </b-tr>
          <b-tr v-else v-for="(enrollment, index) in $data.studentInfo.enrollments" :key="index">
            <b-td>{{ enrollment.course_id }}</b-td>
            <b-td>{{ enrollment.semester_name }}</b-td>
            <b-td>{{(new Date(enrollment.start_date)).toLocaleString("en-US", {timeZone: 'UTC', month:'long', year :'numeric', day:'2-digit'})}}</b-td>
            <b-td>{{(new Date(enrollment.end_date)).toLocaleString("en-US", {timeZone: 'UTC', month:'long', year :'numeric', day:'2-digit'}) }}</b-td>
            <b-td>{{ enrollment.status }}</b-td>
            <b-td>{{ enrollment.grade != ''  ? enrollment.grade : '-'}}</b-td>
            <b-td>
              <b-button  v-if="enrollment.status == 'Planned' || (enrollment.status == 'Completed' && enrollment.grade == '')" class="btn-primary" @click="updateEnrollment(enrollment.id)">
                Edit
              </b-button>
              <b-button v-if="enrollment.status == 'Planned'" class="btn-primary"   @click="deleteEnrollment(enrollment)">
                Delete
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="7" variant="secondary" class="text-right">
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </div>
    <b-button :to="{name:'addCourseEnrollment', params:{studentID : $data.studentInfo.pk}}" class="btn-primary mb-5">Add a course to study plan</b-button>
</div>
    </div>
  </b-container>

</template>
<script>
import {APIService} from '../http/APIServices';
import Vue from 'vue';
import JsonCSV from 'vue-json-csv'
Vue.component('downloadCsv', JsonCSV)
const apiService = new APIService();
export default {
  name: 'Student',
  data: () => ({
    credentials: {},
    studentInfo: {},
    valid: true,
    showMsg: '',
    loading: false,
    displayData: ['course_id', 'semester_name', 'start_date',  'end_date', 'status', 'grade'],
    labels:{course_id:'Course' , semester_name : 'Semester', start_date:'Start Date', end_date:'End Date', status:'Status', grade:'Grade'}
  }),
  mounted() {
    this.getStudentInfo();
  },
  methods: {
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
    deleteEnrollment(enrollment) {
      if(confirm('Do you really want to delete enrollment to course: ' + enrollment.course_id)) {
        apiService.deleteEnrollment(enrollment.id).then((response) => {
          if (response.status === 204) {
            this.getStudentInfo();
          }
        }
      ).catch(e => {
            console.log(e)
            if(e.message.includes("403")) {
              this.showMsg = "You are not authorized to perform this action.";
            }else {
              this.showMsg = e.message;
            }
          }
        )
      }
    },
   updateEnrollment(enrollment_pk) {
      this.$router.push('/student/' +this.$route.params.studentID+'/enrollment/'+enrollment_pk);

    }
  }
}
</script>
<style scoped>

.btn-primary{
  background-color: #000000;
  color: white;
}

@media only screen
and (device-width : 375px)
and (device-height : 812px)
and (-webkit-device-pixel-ratio : 3) {

  .h6 {
    font-size: 2vw;
  }

  .h3 {
    font-size: 5vw;
    font-weight: bold;
  }

  .h4{
    font-size: 4vw;
  }

  a{
    font-size: 3vw;
  }

  .p{
    font-size: 3vw;
  }

  h6 {
    font-size: 2vw !important;
  }
}
</style>
