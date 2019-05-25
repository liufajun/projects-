<template>
  <div class="scroll-news">
    <div class="news-title">
      <router-link to="/news">
        <img src="../assets/img/news-title.jpg" alt="京东快报" />
      </router-link>
    </div>
    <div class="news-list-wrapper">
       <van-swipe  :autoplay="3000" :loop="true" indicator-color="#fff" vertival>
        <van-swipe-item >
          <div class="scroll-box">
            <span class="news-type">推荐</span>
            <p class="news-text">全球首款5G手机预计4月份上市,将是手机领域划时代的开始</p>
          </div>
        </van-swipe-item>
		<van-swipe-item >
          <div class="scroll-box">
            <span class="news-type">推荐</span>
            <p class="news-text">全球首款5G手机预计4月份上市,将是手机领域划时代的开始</p>
          </div>
        </van-swipe-item>
		 <van-swipe-item >
          <div class="scroll-box">
            <span class="news-type">推荐</span>
            <p class="news-text">全球首款5G手机预计4月份上市,将是手机领域划时代的开始</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <router-link to="/news">
      <div class="more" style="display:flex;align-items:center;">
        <span>更多</span>
        <van-icon name="arrow"/>
      </div>
    </router-link>


<div class="test">
	  <van-swipe
        vertical
        :autoplay="3000"
        indicator-color="white"
        class="demo-swipe--vertical"
      >
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
  </div>
  </div>
</template>

<script>
export default {
  name: "ScrollNews",
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped lang="scss">
$height: 0.45rem;
$color: #7d7e80;
.van-swipe {
      width: 100%;
}
.scroll-news {
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.6rem;
  padding: 0.2rem;
  font-size: 12px;
  box-sizing: border-box;
  .news-title {
    img {
      width: 1.4rem;
      height: $height;
	  vertical-align: middle;
    }
  }
  .news-list-wrapper {
    width:4.8rem;
    .scroll-box {
      width:100%;
      display: flex;
      box-sizing: border-box;
      align-items:center;
	  padding:0 .1rem;
      // width:
      .news-type {
		display: inline-block;
		width: 50px;
		text-align:center;
        color: red;
      }
      .news-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
	.more{
	
	}
  }
}
</style>
