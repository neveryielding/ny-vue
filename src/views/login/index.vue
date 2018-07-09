<template>
  <div class="login-container">
    <div class="title-container">
      <h1> Vue Template (N Y) </h1>
    </div>
    <div class="form-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
        <el-form-item label="" prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码"  auto-complete="off"></el-input>
        </el-form-item>
        <div class="text-container">
          <el-checkbox v-model="autoLogin">自动登陆</el-checkbox>
        </div>
        <el-form-item>
          <el-button type="primary" class="login-button" :loading="loading" @click="loginAction">{{loadingText}}</el-button>
        </el-form-item>
        <div class="text-container">
          <el-button class="left" type="text">忘记密码</el-button>
          <el-button class="right" type="text">注册账户</el-button>
        </div>
      </el-form>
    </div>
    <div class="footer-container">
      <p>Copyright © 2018  N Y Web Development</p>
    </div>
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push">
    </vue-particles>
  </div>
</template>

<script>
import VueParticles from '@/components/Particles/index'
import md5 from 'js-md5'
export default {
  name: 'login',
  components: { VueParticles },
  data() {
    return {
      ruleForm: {
        username: 'guest',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于 6 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      autoLogin: false
    }
  },
  methods: {
    loginAction() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          const request = this.$copy(this.ruleForm)
          request.password = md5(request.password)
          this.$store.dispatch('LoginByUsername', request).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    loadingText() {
      return this.loading ? '登陆中..' : '登陆'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  .title-container {
    z-index: 999;
    position: fixed!important;
    width: 100%;
    height: 100px;
    top: 3%;
    text-align: center;
    color: white;
  }
  .form-container {
    background-color: rgba(255,255,255, 0.0);
    z-index: 999;
    position: fixed!important;
    width: 300px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-top: -100px;
    margin-left: -150px;
    color: white;
    .el-input__inner {
      background-color: transparent;
      color: white;
    }
    .el-checkbox {
      color: white;
    }
    .text-container {
      width: 100%;
      height: 40px;
    }
    .login-button {
      width: 100%;
    }
  }
  .footer-container {
    width: 100%;
    height: 80px;
    line-height: 80px;
    z-index: 999;
    position: fixed!important;
    text-align: center;
    color: white;
    bottom: 0;
  }
}
#particles-js {
    // background-image: url("http://img4.imgtn.bdimg.com/it/u=2393950688,574294532&fm=27&gp=0.jpg");
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
