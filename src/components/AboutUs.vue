<template>
  <b-container fluid>
        <b-row class="mt-5">
          <b-col>
            <b-img src="https://www.unomaha.edu/news/2020/03/img/ayailovenu-f.jpg" alt="Student" fluid/>
          </b-col>
          <b-col>
            <h3><b>MISSION</b></h3>
            <p>As both a Metropolitan University of distinction and a Carnegie Doctoral Research institution, the University of Nebraska at Omaha (UNO) transforms and improves the quality of life locally, nationally, and globally.</p>

          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col>
            <h3><b>VISION</b></h3>
            <p>The University of Nebraska at Omaha is recognized as the premier Metropolitan University throughout the United States and the world.</p>
          </b-col>
          <b-col>
            <b-img src="https://unothegateway.com/wp-content/uploads/2020/03/criss-libaray_ucomm-scaled.jpg" alt="Library" fluid/>
          </b-col>
        </b-row>

    <b-row class="mt-5">
      <b-col>
            <b-img src="https://www.unomaha.edu/college-of-business-administration/executive-mba/mini-mba/20180920_mini_mba_012.jpg" alt="Classroon" fluid/>
          </b-col>
          <b-col>
            <h2><b>HISTORY</b></h2>
            <p>The history of UNO has been a powerful guiding force. Our past fuels our pride and shapes the comprehensive metropolitan university we've become. We were built on a commitment to provide a rigorous, relevant and affordable education that meets the diverse needs of traditional and nontraditional students. UNO has been and always will be driven by the extraordinary connection to and partnership with the city of Omaha.</p>
          </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
name: "AboutUs"
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
