<template>
  <div>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-anomaly">
        <div class="floor-one">
          <img v-lazy="floorData0.image" width="100%">
        </div>
        <div>
          <div class="floor-two">
            <img v-lazy="floorData1.image" width="100%">
          </div>
          <div>
            <img v-lazy="floorData2.image" width="100%">
          </div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item, index) in floorData.slice(3)" :key="index">
          <img v-lazy="item.image" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  created() {
   
  },
  methods: {
   
  },
  watch: {
    //   刷新页面时数据可能还没获取到会出错，通过watch监听数据(数据发生变化就获取数据)(可用promise)
    floorData: function(val) {
      //   console.log(this.floorData);
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>

<style lang="scss" scoped>
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 0.65rem;
  line-height: 0.65rem;
  background: pink;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>