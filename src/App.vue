<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import "assets/css/global.css";
  #app{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .clear:after {
    content: "";
    display: block;
    clear: both;
    zoom:1;
  }
  a, a:active, a:hover {
    /*color: #000;*/
    text-decoration:none
  }
  /*模态框公用垂直居中样式*/
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .vertical-center-modal .ivu-modal{
    top: 0;
  }
  .sd{
  -webkit-box-shadow:0 0 10px rgba(225,225,225, .9);  
  -moz-box-shadow:0 0 10px rgba(225,225,225, .9);  
  box-shadow:0 0 10px rgba(225,225,225, .9);
  transition: all .2s ease-in-out;
}
.sd:hover{
  -webkit-box-shadow:0 0 2px rgba(225,225,225, .9);  
  -moz-box-shadow:0 0 2px rgba(225,225,225, .9);  
  box-shadow:0 0 2px rgba(225,225,225, .9);
  transition: all .2s ease-in-out;
}
</style>
