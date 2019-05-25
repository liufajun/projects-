<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-box" v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <a href="javascript:;" class="a-icon">
            <img class="icon-img" v-lazy="item.imgUrl" >
            <p class="icon-keywords">{{item.desc}}</p>
          </a>
        </div>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "typeBar",
  props: ["iconList"],
  data() {
    return {
      swiperOption: {
        // pagination: ".swiper-pagination",
        loop: false
      }
    };
  },
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        // 向下取整(一页显示8个数据),page代表页数
        const page = Math.floor(index / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="scss" scoped>
.icons {
  width: 100%;
  padding-top: 0.4rem;
  .swiper-container {
    padding-bottom: 0.25rem;
  }
  .swiper-box {
    display: flex;
    flex-wrap: wrap;
  }
  .icon {
    width: 25%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .a-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon-img {
        width: 1.15rem;
        height: 1.15rem;
      }
      .icon-keywords {
        width: 100%;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>