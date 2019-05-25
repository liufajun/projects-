<template>
  <div class="icons">
    <!-- <van-swipe  :loop="false" indicator-color="#fff">
      <van-swipe-item v-for="(page, index) in pages" :key="index">
       
        <div class="icon" >
          <a href="javascript:;" class="a-icon" v-for="item of page" :key="item.id">
            <img class="icon-img" :src="item.imgUrl" alt>
            <p class="icon-keywords">{{item.desc}}</p>
          </a>
        </div>
      </van-swipe-item>
    </van-swipe>-->

    <div v-for="(page, index) in pages" :key="index">
      <div class="icon">
        <a href="javascript:;" class="a-icon" v-for="item of page" :key="item.id">
          <img class="icon-img" :src="item.imgUrl" alt>
          <p class="icon-keywords">{{item.desc}}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "icons",
  data() {
    return {
      iconList: [
        {
          id: "0001",
          aHref: "",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
          desc: "景点门票"
        },
        {
          id: "0002",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
          desc: "广东必游"
        },
        {
          id: "0003",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/6a/45f595250c73d102.png",
          desc: "夏日玩水"
        },
        {
          id: "0004",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png",
          desc: "文化古迹"
        },
        {
          id: "0005",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png",
          desc: "动植物园"
        },
        {
          id: "0006",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png",
          desc: "故宫"
        },
        {
          id: "0007",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
          desc: "一日游"
        },
        {
          id: "0008",
          imgUrl:
            "http://img1.qunarzz.com/piao/fusion/1803/6a/45f595250c73d102.png",
          desc: "夏日玩水"
        }
      ]
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
