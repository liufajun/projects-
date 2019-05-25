<template>
  <div class="detail">
    详情页面获取id: {{ id }}
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      // 获取列表页传过来的id
      id: this.$route.params.id
    }
  },
  created () {
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo () {
      // 没有详情页接口
       this.axios
        .get("/api/journalismApi" + this.id)
        .then(resolve => {
          console.log(resolve);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}

</script>
<style lang="scss" scoped>
  .detail{
   
  }
</style>

