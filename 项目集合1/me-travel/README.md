# travel

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 解决移动端点击屏幕时延迟300ms的方案：
```
引入fastclick.js插件
```

### 解决移动端1px像素问题的方案：
```
引入border.css文件,如果某个元素需添加一条底部边框,只要在该元素上添加class样式border-bottom即可
```

### git提交：
```
1.在github上创建远程分支aaa(本地是否也要创建一个分支)
2.git pull 把远程分支拉取到本地,然后切换到这个分支:git checkout aaa
3.
...
4.分支合并：
    切换到master分支：git checkout master
    远程aaa分支合并到master分支：git merge origin/aaa
    git push

```

### 笔记说明：
```
@import '../../../assets/styles/varibles.styl'与@import '~@/assets/styles/varibles.styl'路径相同

@符号表示src路径

npm install vue-awesome-swiper@2.6.7 --save (安装vue轮播插件,使用方法可访问: https://github.com/surmon-china/vue-awesome-swiper)

改变vue-awesome-swiper轮播小圆点选中时的颜色：   .wrapper >>> .swiper-pagination-bullet-active{background:#fff !important;}

icons.vue中的swiper分页轮播通过computed计算属性来实现

css文本溢出出现省略号：需设置宽度width或min-width,max-width

```
 