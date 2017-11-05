<template>
  <div class="container">
    <div class="big-logo"></div>
    <div class="info">
      <div class="info-name">
        <span class="info-icon info-name-icon"></span>
        <div class="info-input">
          <input class="info-entry" type="text" name="userName" placeholder="请输入姓名" v-model="name" autofocus="autofocus">
        </div>
      </div>
      <div class="info-phone">
        <span class="info-icon info-phone-icon"></span>
        <div class="info-input">
          <input class="info-entry" type="text" name="userPhone" v-model="phone" placeholder="请输入手机号">
          <input type="button" :value="codeText" class="get-code" @click="getCode" :disabled="checkable">
        </div>
      </div>
      <div class="info-code">
        <span class="info-icon info-code-icon"></span>
        <div class="info-input">
          <input class="info-entry" type="text" name="userCode" placeholder="请输入验证码"  v-model="code">
        </div>
      </div>
    </div>
    <div class="info-button" @click="allSubmit">签到</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seconds: 60,
      time: 0,
      checkable: false,
      phone: '',
      code: '',
      name: ''
    }
  },
  mounted () {
    document.title = "签到";
  },
  computed: {
    codeText: function () {
      return this.time > 0 ? this.time + 's后重新获取' : '获取验证码';
    }
  },
  methods: {
    getCode: function () {
      var $this = this;
      if(this.$vuerify.check()) {
        $this.axios({
          url: '/2017tower/sign/doSendSms',
          method: 'post',
          data: {
            user_mobile: $this.phone
          },
          transformRequest: [function(data) {
            let ret = '';
            for (let i in data) {
              ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
          }]
        })
        .then(function(res) {
          console.log(res);
          $this.time = $this.seconds;
          $this.checkable = !$this.checkable;
          $this.timer();
        })
        .catch(function(error) {
          console.log($this.phone);
          console.log(error);
        });
      } else {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'warn',
          width: '2.8rem',
          position: 'middle',
          time: 1500
        })
      }
    },
    timer: function () {
      const $this = this;
      if($this.time > 0) {
        $this.time--;
        setTimeout(function () {
          $this.timer();
        },1000)
      } else {
        $this.checkable = !$this.checkable;
      }
    },
    allSubmit: function () {
      var $this = this;

      if(this.$vuerify.check()) {
        $this.axios({
          url: '/2017tower/sign/doSignTicket',
          method: 'post',
          data: {
            user_name: $this.name,
            user_mobile: $this.phone,
            user_code: $this.code
          },
          transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
              ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
          }]
        })
        .then(function(res) {
          console.log(res);
          if(!res.data.code) {
            $this.$router.push({
              name: 'success',
              query: {
                userName: $this.name,
                ticketType: res.data.data.ticket_type
              }
            });
          } else if(res.data.code == 10000) {
            $this.$vux.toast.show({
              text: '信息提交不全',
              type: 'warn',
              width: '2.8rem',
              position: 'middle',
              time: 1500
            })
          } else if(res.data.code == 10001) {
            $this.$vux.toast.show({
              text: '验证码输入错误',
              type: 'warn',
              width: '2.8rem',
              position: 'middle',
              time: 1500
            })
          } else if(res.data.code == 10003) {
            $this.$router.push({ 
              name:'fail',
              params: {
                errorId: 1
              }
            });
          } else if(res.data.code == 10004) {
            $this.$router.push({ 
              name:'fail',
              params: {
                errorId: 2
              }
            });
          } else if(res.data.code == 10005) {
            $this.$router.push({ 
              name:'fail',
              params: {
                errorId: 3
              }
            });
          }
        })
        .catch(function(error) {
        });
      } else {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'warn',
          width: '2.8rem',
          position: 'middle',
          time: 1500
        })        
      }
    }
  },
  //手机号正则
  vuerify: {
    phone: {
      test: /^1(3|4|5|7|8)\d{9}$/,
      message: "手机号输入错误"
    }
  }
}
</script>

<style lang="less" scoped>

@import "./../styles/pages/_check";

</style>
