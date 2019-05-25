<template>
  <div class="new-popole">
      <div class="new-popole-item1" >
          <a href="javascript:;">
              <img :src="imgList[0].imgUrl"/>
          </a>
      </div>
       <div class="new-popole-item2" >
          <a href="javascript:;">
              <img :src="imgList[1].imgUrl"/>
          </a>
      </div>
       <div class="new-popole-item3" >
          <a href="javascript:;">
              <img :src="imgList[2].imgUrl"/>
          </a>
      </div>
  </div>
</template>
<script>
export default {
  name: "NewPepole",
  data() {
    return {
      imgList: [
        {
          id: "0001",
          aHref: "",
          imgUrl:
            "https://m.360buyimg.com/mobilecms/jfs/t1/26685/26/1930/47992/5c186663Ee07857b2/533b3a90ad7aa17b.jpg!q70.jpg.dpg",
          desc: "景点门票"
        },
        {
          id: "0002",
          aHref: "",
          imgUrl:
            "https://m.360buyimg.com/mobilecms/jfs/t1/18133/22/6850/53621/5c63f35bE724cd222/c62f916947c69035.jpg!q70.jpg.dpg",
          desc: "广东必游"
        },
        {
          id: "0002",
          aHref: "",
          imgUrl:
            "https://m.360buyimg.com/mobilecms/jfs/t1/18133/22/6850/53621/5c63f35bE724cd222/c62f916947c69035.jpg!q70.jpg.dpg",
          desc: "广东必游"
        }
      ]
    };
  },
  computed: {
   
  }
};
</script>
<style lang="scss" scoped>
 .new-popole{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
}
.new-popole-item1{
            img{
                width: 3.6rem;
                height: 2.4rem;
            }
        }
    .new-popole-item2{
            img{
                width: 1.85rem;
                height: 2.4rem;
            }
        }
         .new-popole-item3{
             a{
                 padding-right: .07rem;
             }
            img{
                width: 1.88rem;
                height: 2.4rem;
            }
        }
   

</style>
