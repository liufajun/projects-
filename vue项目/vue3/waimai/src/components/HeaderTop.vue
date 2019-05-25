<template>
    <div class="header-container">
		<div class="search">
			<van-search placeholder="请输入搜索关键词" v-model="value" />
		</div>
        
		<div class="login">登录</div>
    </div>
   
</template>

<script>
export default {
  name: 'headerTop',
  data() {
    return {
      value: ''
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$color: #7d7e80;
	.van-search{
		background: rgb(67, 152, 233) !important;
		height:1rem; 
	}
	.header-container{
		background-color: rgb(67, 152, 233);
		display: flex;
		justify-content: space-between;
		align-items: center;
		.search{
			flex: 1;
		}
		.login{
			color: #fff;
			padding: 16px 10px;
			font-size: 12px;
		
		}
	}
</style>


