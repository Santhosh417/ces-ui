<template>
  <b-container>
        <b-card v-if="credentials.authenticates" class="mt-3 mb-3 bg-light">
        <b-row>
          <b-col>
            <p><strong>Enter student NUID</strong></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-sm-8">
            <b-input-group class="mb-sm-2">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="search"  v-model="studentID" placeholder="NUID" @input="validateStudentID"/>
            </b-input-group>
          </b-col>
          <b-col class="col-sm-4">
            <b-button :to="{name:'student', params:{studentID : studentID}}" class="btn-primary">Search</b-button>
          </b-col>
        </b-row>
        </b-card>
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
        <p>The University of Nebraska Omaha (Omaha or UNO) is a public research university in Omaha, Nebraska. Founded in 1908 by faculty from the Omaha Presbyterian Theological Seminary as a private non-sectarian college, the university was originally known as the University of Omaha.</p>
        <p>UNO is Nebraska's metropolitan university — a university with strong academic values and significant relationships with our community that transforms and improves the lives of those on a local, regional, national, and international level.</p>
      </div>
      <b-row>
        <b-col>
          <img src="https://www.unomaha.edu/news/2020/03/img/ayailovenu-f.jpg" alt="Student" style="width:100%">
        </b-col>
        <b-col>
          <img src="https://unothegateway.com/wp-content/uploads/2020/03/criss-libaray_ucomm-scaled.jpg" alt="Library" style="width:100%">
        </b-col>
          <b-col>
          <b-img src="https://www.unomaha.edu/college-of-arts-and-sciences/mathematics/_files/images/math%20lab2.JPG" alt="Classroom" style="width:100%"/>
          </b-col>
      </b-row>
      <div class="content">
        <p>UNO is dedicated to the city and state in our name. As the University of Nebraska's metropolitan university campus, no fences or barriers separate students from the opportunities offered by the greater Omaha area. We address real issues, providing relevant learning opportunities that uniquely prepare our graduates as professionals and active members of their community.</p>
      </div>
  </b-container>
</template>

<script>
import {APIService} from '../http/APIServices';
const apiService = new APIService();
export default {
  name: 'Home',
  data() {
    return {
      images: ['https://www.unomaha.edu/news/2018/10/img/ash-fall1.jpg', 'https://www.unomaha.edu/about-uno/buildings-and-maps/_assets/img/170619_BaxterArena_146a-facade.jpg', 'https://hollandbasham.com/wp-content/uploads/2016/11/SC-08-1.jpg'],
      credentials: {
        authenticates: localStorage.getItem('isAuthenticates')
      },
      studentID: null,
      studentIDValid: null,
      studentIDInvalidText: '',
      valid: true,
      showMsg: '',
      loading: false,
      rules: {
        studentID: [
          v => !!v || "Student ID is required",
          v => (v && v.length > 3) || "A Student ID be more than 3 characters long",
          v => /^[0-9_]+$/.test(v) || "A Student ID can only contain digits only"
        ]
      },
    }
  },
  methods: {
    validateStudentID(){
      if (this.$data.studentID != null && this.$data.studentID.match(/^[0-9_]+$/)) {
        this.$data.studentIDInvalidText = '';
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

  p{
    font-size: 3vw;
  }

  b{
    font-size: 5vw;
    font-weight: bold;
  }

  h6 {
    font-size: 2vw !important;
  }
}
</style>
