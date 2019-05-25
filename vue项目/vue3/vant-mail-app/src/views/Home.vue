<template>
  <div class="home">
     <div class="swiper">
      <van-swipe :autoplay="5000" :loop="false" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in homeSwiperImg" :key="index">
          <img :src="image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <Icons></Icons>
  </div>
</template>

<script>

// @ is an alias to /src
import Icons from "@/components/home-components/Icon.vue";
export default {
  name: 'home',
  data () {
    return {
      homeSwiperImg: [
        "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
        "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34869/14/3703/113972/5cb953c1E4294d8ea/b73c538710f5c462.jpg!cr_1125x549_0_72!q70.jpg.dpg",
        "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/39343/4/1551/48272/5cbd71f4E329401dc/579b33f530a1402d.jpg!cr_1125x549_0_72!q70.jpg.dpg",
        "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34729/14/3948/120618/5cbeee07Efbe17ec5/d57ddd4fbbbc09e0.jpg!cr_1125x549_0_72!q70.jpg.dpg",
        "https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34423/17/5378/97852/5cbecd7bE73730c2f/76e5359d8fb3a1e1.jpg!cr_1125x549_0_72!q70.jpg.dpg"
      ]
    }
  },
  created () {
    this.getBannerData();
  },
  components: {
    Icons
  },
  methods: {
	  getBannerData () {
		  this.axios.get("/api/journalismApi").then( resolve => {
        // console.log(resolve.data.data)
      }).catch( error => {
         console.log(error)
      })
	  }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    width: 100%;
    overflow-x: hidden;
  }
   .swiper {
    width: 100%;
    height: 3.4rem;
    .van-swipe{
      width: 100%;height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: #fff;
    }
  }
</style>

