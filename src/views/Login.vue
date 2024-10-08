<script setup>
import request from '@/http/request';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';
import { decryptAES } from '@/util/crypto';

const userdata = ref({
  account: '',
  password: ''
});

//自动获取焦点
const accountInput=ref(null)
onMounted(()=>{
  if(accountInput.value){
    accountInput.value.focus();
  }
})


const rules = ref({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

const submitForm = () => {
    request.post("/user/login",userdata.value).then(res=>{
    if(res.code==='0'){
      Cookies.set('user',JSON.stringify(res.data),{expires:1})
      ElMessage.success("登录成功！")
      if(decryptAES(res.data.account,res.data.secretKey)==='admin'){
        router.push('/AUserM')
      }else{
        router.push('/SystemItem')
      }
    }else{
      ElMessage.error(res.msg)
    }
  })
}

</script>
<template>
  <div class="login-container">
    <div class="login-form">
      <h2>欢迎登录</h2>
      <el-form :model="userdata" :rules="rules" ref="loginForm"  class="demo-ruleForm" @keyup.enter="submitForm">
        <el-form-item label="" prop="account">
          <el-input v-model="userdata.account" placeholder="账号" ref="accountInput"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="userdata.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #2862c0);
}

.login-form {
  max-width: 400px; /* 最大宽度为400px */
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.el-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  margin-top: 10px;
}

.el-button + .el-button {
  margin-top: 10px;
}

/* 响应式样式 */
@media (min-width: 600px) {
  .login-form {
    width: 50%; /* 视口宽度大于600px时，宽度为50% */
  }
}

@media (min-width: 900px) {
  .login-form {
    width: 30%; /* 视口宽度大于900px时，宽度为30% */
  }
}
</style>