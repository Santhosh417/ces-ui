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
              <b-col><strong>Start Date: </strong> {{ $data.studentInfo.start_date }}</b-col>
            </b-row>
            <b-row>
              <b-col><strong>Expected Graduation Date: </strong>{{ $data.studentInfo.graduation_date }}</b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div>
      <b-table-simple v-if="showMsg == ''" hover small caption-top responsive>
        <caption><p class="h3">Enrollments:</p></caption>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>ID</b-th>
            <b-th>Course ID - Course Name</b-th>
            <b-th>Semester Name</b-th>
            <b-th>Start Date</b-th>
            <b-th>End Date</b-th>
            <b-th>Status</b-th>
            <b-th>Grade</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(enrollment, index) in $data.studentInfo.enrollments" :key="index">
            <b-td>{{ enrollment.id }}</b-td>
            <b-td>{{ enrollment.course_id }}</b-td>
            <b-td>{{ enrollment.semester_name }}</b-td>
            <b-td>{{ enrollment.start_date }}</b-td>
            <b-td>{{ enrollment.end_date }}</b-td>
            <b-td>{{ enrollment.status }}</b-td>
            <b-td>{{ enrollment.grade }}</b-td>
            <b-td><b-button v-if="enrollment.status == 'Planned' || (enrollment.status == 'Completed' && enrollment.grade != '')">Edit</b-button> <b-button v-if="enrollment.status == 'Planned'">Delete</b-button></b-td>
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
  </b-container>

</template>
<script>
import {APIService} from '../http/APIServices';
const apiService = new APIService();
export default {
  name: 'Login',
  data: () => ({
    credentials: {},
    studentInfo: {},
    valid: true,
    showMsg: '',
    loading: false
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
    }
  }
}
</script>
<style scoped>
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
