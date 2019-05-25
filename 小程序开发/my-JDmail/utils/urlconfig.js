const domain = 'https://enigmatic-island-47099.herokuapp.com'; 

// 接口配置
const interfaces = {

      // 请求首页数据接口
      homepage: domain + '/api/profiles/homepage',

      // 请求商品数据接口
      productions: domain + '/api/profiles/productions',

      // 请求商品列表数据接口
      productionsList: domain + '/api/profiles/productionsList',

      // 请求商品详情数据
      productionDetail: domain + '/api/profiles/productionDetail'

}

module.exports = interfaces;