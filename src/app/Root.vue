<template>
  <div style="height:100%">
   <div class="root_header">
     <div class="container">
       <div class="item_left">中国儿童分级阅读数据采集系统</div>
       <div class="item_right"><Icon type="android-person" style="padding-right:10px"></Icon>欢迎登陆 : {{$store.state.user.name}} <span id="logout" style="padding-left:40px;cursor:pointer" @click="logout()">退出登录</span></div>
     </div>
   </div>
      <router-view></router-view>
   <div class="login_bottopm" id="login_bottom">
    <div class="container">
        <div class="bottom_1" style="margin-left:200px;">十三五“中文分级阅读教育创新”重大课题办公室
        <br>地 址：北京海淀区海淀二街中关村SOHO A区1519室</div>
        <div class="bottom_1">
          联系人：李端 胡学谦<br>
          电 话：010-57226420 13520781990
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'notFound',
    data () {
      return {
      }
    },
    methods: {
      logout () {
        if (this.$route.meta.input) {
          this.$router.push('/xykjinput666')
        } else {
          this.$router.push('/login')
        }
        // console.log(this.$route.meta.input)
        this.delCookie('SESS')
      },
      getCookie (name) {
        let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        if (arr === document.cookie.match(reg)) {
          return unescape(arr[2])
        } else {
          return null
        }
      },
      delCookie (name) {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(name)
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
      }
    },
    created () {
      document.getElementsByTagName('body')[0].setAttribute('style', 'background-color:#fff;height:100%')
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item_left{
    float: left;
    line-height: 40px;
  }
  .item_right{
    float: right;
    line-height: 40px;
  }
  .root_header{
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    height: 40px;
    background-color: #306097;
  }
  .bottom_1{
    padding-top: 13px;
    line-height: 26px;
    font-size: 14px;
    color: #fff;
    text-align: left;
    float: left;
    width: 450px;
  }
  .container{
    width: 1100px;
    margin: auto;
  }
  .login_bottopm{
/*    width: 100%;*/
    bottom: 0px;
    background-color: #306097;
    height: 80px;
  }
</style>
