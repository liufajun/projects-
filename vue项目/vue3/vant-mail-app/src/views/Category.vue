<template>
  <div class="list">
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>

<script>
export default {
  name: "category",

  data() {
    return {
      items: [
        {
          // 导航名称
          text: "热门城市",
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: "北京",
              // id，作为匹配选中状态的标识
              id: 1,
              // 禁用选项
              disabled: false
            },
            {
              text: "上海",
              id: 2
            },
            {
              text: "广州",
              id: 3
            },
            {
              text: "深圳",
              id: 4
            },
            {
              text: "成都",
              id: 5
            },
            {
              text: "重庆",
              id: 6
            },
            {
              text: "西安",
              id: 7
            }
          ]
        },
        {
          text: "广东",
          children: [
            {
              text: "深圳",
              id: 1,
              disabled: false
            },
            {
              text: "广州",
              id: 2
            },
            {
              text: "东莞",
              id: 3
            },
            {
              text: "珠海",
              id: 4
            },
            {
              text: "佛山",
              id: 5
            },
            {
              text: "中山",
              id: 6
            },
            {
              text: "韶关",
              id: 7
            }
          ]
        },
        {
          // 导航名称
          text: "浙江",
          // 该导航下所有的可选项
          children: [
            {
              // 名称
              text: "温州",
              // id，作为匹配选中状态的标识
              id: 1,
              // 禁用选项
              disabled: false
            },
            {
              text: "杭州",
              id: 2
            },
            {
              text: "台州",
              id: 3
            },
            {
              text: "金华",
              id: 4
            },
            {
              text: "绍兴",
              id: 5
            },
            {
              text: "宁波",
              id: 6
            }
          ]
        },
        {
          text: "江苏",
          children: [
            {
              text: "南京",
              id: 1,
              disabled: false
            },
            {
              text: "苏州",
              id: 2
            },
            {
              text: "扬州",
              id: 3
            },
            {
              text: "无锡",
              id: 4
            },
            {
              text: "连云港",
              id: 5
            }
          ]
        },
        {
          text: "广东",
          children: [
            {
              text: "深圳",
              id: 1,
              disabled: false
            },
            {
              text: "广州",
              id: 2
            },
            {
              text: "东莞",
              id: 3
            },
            {
              text: "珠海",
              id: 4
            },
            {
              text: "佛山",
              id: 5
            },
            {
              text: "中山",
              id: 6
            },
            {
              text: "韶关",
              id: 7
            }
          ]
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  },
  computed: {},
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
};
</script>
<style lang="scss" scoped>
$hearHeight: 46px;
$footerHeight: 50px;
$baseActiveColor: #1989fa;
$fontActiveColor: #444;
.list {
  // height: calc( 100vh - 96px )
}
.van-tree-select {
  height: calc(100vh - 96px) !important;
  overflow-y: hidden;
}
/* 隐藏滚动条(只兼容谷歌) */
.van-tree-select::-webkit-scrollbar {
    display: none;
}
.van-tree-select__item {
  color: $fontActiveColor;
}
.van-tree-select__item--active {
  color: $baseActiveColor;
}
.van-tree-select__nitem--active::after {
  background-color: $baseActiveColor;
}
.van-tree-select__nitem--active {
  color: $baseActiveColor;
}
</style>
