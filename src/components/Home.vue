<template>
  <b-container>

    <template>
      <div class="carousel">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          padding= "100"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide v-for="image in images"
            :img-src="image" :key="image"
          >
          </b-carousel-slide>
<!-- 
          <b-carousel-slide
            img-src="https://www.unomaha.edu/about-uno/buildings-and-maps/_assets/img/170619_BaxterArena_146a-facade.jpg">
          </b-carousel-slide>

          <b-carousel-slide
            img-src="https://hollandbasham.com/wp-content/uploads/2016/11/SC-08-1.jpg">
          </b-carousel-slide> -->

        </b-carousel>
      </div>
      <div class="content">
        <p><b>The University of Nebraska Omaha (Omaha or UNO) is a public research university in Omaha, Nebraska. Founded in 1908 by faculty from the Omaha Presbyterian Theological Seminary as a private non-sectarian college, the university was originally known as the University of Omaha.</b></p>
        <p><b>UNO is Nebraska's metropolitan university — a university with strong academic values and significant relationships with our community that transforms and improves the lives of those on a local, regional, national, and international level.</b></p>
      </div>
      <div class="row">
        <div class="column">
          <img src="https://www.unomaha.edu/news/2020/03/img/ayailovenu-f.jpg" alt="Student" style="width:100%">
        </div>
        <div class="column">
          <img src="https://unothegateway.com/wp-content/uploads/2020/03/criss-libaray_ucomm-scaled.jpg" alt="Library" style="width:100%">
        </div>
        <div class="column">
          <img src="https://www.unomaha.edu/college-of-arts-and-sciences/mathematics/_files/images/math%20lab2.JPG" alt="Classroom" style="width:100%">
        </div>
      </div>
      <div class="content">
        <p><b>UNO is dedicated to the city and state in our name. As the University of Nebraska's metropolitan university campus, no fences or barriers separate students from the opportunities offered by the greater Omaha area. We address real issues, providing relevant learning opportunities that uniquely prepare our graduates as professionals and active members of their community.</b></p>
      </div>


          
    </template>

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

// name: "Home",
//   data: () => ({
//     authenticated: false,
//     validUserName : '',
//     images: ['https://www.unomaha.edu/news/2018/10/img/ash-fall1.jpg','https://www.unomaha.edu/about-uno/buildings-and-maps/_assets/img/170619_BaxterArena_146a-facade.jpg', 'https://hollandbasham.com/wp-content/uploads/2016/11/SC-08-1.jpg' ]
//   }),
//   mounted() {
//     this.getUser();

//   },

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
.carousel {
  padding: 5px;
  border: 0px;
}
.content {
  text-align: center;

}

.column {
  float: left;
  width: 33.33%;
  padding: 5px;
}


 
</style>
