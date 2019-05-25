<template>
  <div class="news-list">
    <ul v-for="(items,index) of listData" :key="index">
      <li v-for="(item,index) of items" :key="index">
        <div class="header">
          <span>{{item.category}}</span>
          <div class="more">
            <span>加载更多</span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <router-link :to="'/detail/' + item.docid" class="news-list-items">
          <img src="../assets/logo.png" alt>
          <div class="news-list-item">
            <div class="news-list-content">{{item.title}}</div>
            <div class="news-list-desc">
              <div class="time">
                发布时间:
                <span>2019-05-03 00:30:58</span>
              </div>
              <div class="source">
                来源:
                <span>{{item.source}}</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      listData: []
    };
  },
  components: {},
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      let that = this;
      this.axios
        .get("/api/journalismApi")
        .then(resolve => {
          console.log(resolve.data.data);
          that.listData = resolve.data.data;
          console.log(that.listData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
$padding: 0.15rem;
$right: 0.2rem;
.news-list {
  width: 100%;
}
ul,
li {
  width: 100%;
  list-style: none;
}
li {
  padding: 0.2rem $padding;
  box-sizing: border-box;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-left: 4px solid #f50;
    padding: 2px 0;
    padding-left: 3px;
    box-sizing: border-box;
    font-size: 16px;
    .more {
      display: flex;
      align-items: center;
    }
  }
  .news-list-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f0ec;
    padding: 0.2rem 0;
    box-sizing: border-box;
    color: #000;
    img {
      width: 1.6rem;
      height: 1rem;
      margin-right: $right;
    }
    .news-list-item {
      width: calc(100% - 1.8rem);
      .news-list-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        padding-bottom: 0.1rem;
      }
      .news-list-desc {
        display: flex;
        font-size: 12px;
        color: #666;
        .time {
          flex: 2;
        }
        .source {
          flex: 1;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          color: #1989fa;
        }
      }
    }
  }
}
ul:nth-last-of-type(1) li .news-list-items {
  border-bottom: none !important;
}
</style>

