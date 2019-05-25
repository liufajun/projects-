<template>
  <div class="icons">
    <van-swipe  :loop="false" indicator-color="#fff">
      <van-swipe-item v-for="(page, index) in pages" :key="index">
        <!-- <img :src="image"> -->
        <div class="icon" >
          <a href="javascript:;" class="a-icon" v-for="item of page" :key="item.id">
            <img class="icon-img" :src="item.imgUrl" alt>
            <p class="icon-keywords">{{item.desc}}</p>
          </a>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "icons",
  data() {
    return {
      
			
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
  }
};
</script>
<style lang="scss" scoped>
.icons {
  width: 100%;
  padding-top: 0.4rem;
  .icon {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .a-icon {
      width: 25%;
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
<!-- 

 -->
