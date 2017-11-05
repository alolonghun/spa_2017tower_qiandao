<template>
  <div class="container">
    <div :class="failImg"></div>
    <div class="info">
      <span class="info_fail"></span>
      <span class="info_way" v-html="errorMsg"></span>
    </div>
    <!-- <div class="myPhone myPhone_1">
      <span class="phone_code">吴晓昕 13004174578</span>
      <span class="phone_icon" @click="showMenu1"></span>
    </div> -->
    <div class="myPhone myPhone_2">
      <span class="phone_code">王红燕 17802168249</span>
      <span class="phone_icon" @click="showMenu2"></span>
    </div>
    <div class="myPhone myPhone_2">
      <span class="phone_code">丁梦佳 18217256283</span>
      <span class="phone_icon" @click="showMenu3"></span>
    </div>
    <div class="time" v-if="isTime">{{signTime}}</div>
    <div class="other">
      <span class="logo"></span>
    </div>
    <transition name="fold">
      <div class="bottom-menu" v-if="showSelect2 || showSelect3">
        <div class="menu-select call">拨打 <a :href="'tel:'+[phoneNumber]">{{ phoneNumber }}</a></div>
        <div class="menu-select cancel" @click.prevent="hideMenu">取消</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showSelect1: false,
      showSelect2: false,
      showSelect3: false,
      errorMsg: '',
      failImg: 'failed',
      isTime: false,
      signTime: ''
    }
  },
  mounted() {
    if(this.$route.params.errorId == 1) {
      if(this.getCookie("Login2017tower")) {
        this.isTime = true;
        this.signTime = this.getCookie("LoginTime") + ' ' + this.getCookie("LoginSignNums");
        $('.info_fail').addClass('info_success');
        this.errorMsg = '您已签到过了<br>请到签到处进行核实';
        this.failImg = 'failedTip';   
      } else {
        this.$router.push({name: 'sign'});
      }
    } else if(this.$route.params.errorId == 2) {
      this.errorMsg = '未查询到您的购票信息<br>请到服务处咨询<br>或拨打以下联系人电话';
    } else if(this.$route.params.errorId == 3) {
      this.errorMsg = '请到服务处咨询<br>或拨打以下联系人电话';
    }
  },
  computed: {
    phoneNumber: function() {
      return this.showSelect1 ? '13004174578' : this.showSelect2 ? '17802168249' : '18217256283';
    }
  },
  methods: {
    // showMenu1: function () {
    //   this.showSelect1 = true;  
    //   this.showSelect2 = false;
    //   this.showSelect3 = false;
    // },
    showMenu2: function () {
      // this.showSelect1 = false;
      this.showSelect2 = true;
      this.showSelect3 = false;
    },
    showMenu3: function () {
      // this.showSelect1 = false;
      this.showSelect2 = false;
      this.showSelect3 = true;
    },
    hideMenu: function () {
      // this.showSelect1 = false;
      this.showSelect2 = false;
      this.showSelect3 = false;
    },
    getCookie: function(cookie_name){
      var allcookies = document.cookie;
      var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
    
      if (cookie_pos != -1) {
          cookie_pos += cookie_name.length + 1;      
          var cookie_end = allcookies.indexOf(";", cookie_pos);
    
          if (cookie_end == -1)
          {
              cookie_end = allcookies.length;
          }
    
          var value = unescape(allcookies.substring(cookie_pos, cookie_end));
      }
      return value;
    }
  }
}
</script>

<style lang="less" scoped>

@import "./../styles/pages/_fail.less";

</style>
