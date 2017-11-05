<template>
  <div class="container">
    <div class="head">
      <span class="ch animated rubberBand">{{ successMsg }}</span>
      <span class="en">CORDIAL INVITATION</span>
    </div>
    <div class="user">
      <span class="user_name">{{ name }}</span>
      <span class="user_sex">先生/女士</span>
    </div>
    <div class="line"></div>
    <div class="other"> 
      <img src="../img/image/success_QR_code.png" class="QR_code animated bounceIn">
      <span class="scan">扫码关注校长邦</span>
      <span class="time">2017.10.29-10.31</span>
      <span class="address">上海.世贸商城 .1层（展区）.7层（会议）</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      successMsg: ''
    }
  },
  mounted () {
    const $this = this;
    $this.name = $this.$route.query.userName;
    $this.successMsg = '欢迎' + $this.$route.query.ticketType;
    if($this.getCookie("Login2017tower")) {
      setTimeout(function() {
        $this.$vux.toast.show({
          text: '签到成功',
          width: '2.3rem',
          position: 'middle',
          time: 2000
        })
      }, 1200)      
    } else {
      $this.$router.push({name: 'sign'});
    }
  },
  methods: {
    getCookie: function(cookie_name) {
      var allcookies = document.cookie;
      var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度

      if (cookie_pos != -1) {
        cookie_pos += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
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

@import "./../styles/pages/_success";

</style>
