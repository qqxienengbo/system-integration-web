<script setup>
import router from '@/router';
import Cookies from 'js-cookie';
import { ref } from 'vue';
// const user=ref(JSON.parse(Cookies.get('user')))
const user=ref(Cookies.get('user')?JSON.parse(Cookies.get('user')):{})
const quit=()=>{
  Cookies.remove('user')
  router.push("/Login")
}

const toMe=()=>{
  router.push("/Me")
}
</script>
<template>
  <div class="conten">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="text">
      <h3>XXXX集成系统</h3>
    </div>
    <div class="user">
      <el-dropdown placement="bottom">
        <h3>{{ user.username }}</h3>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toMe">个人中心</el-dropdown-item>
            <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.conten {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; /* 垂直居中 */
}
.logo{
  height: 100%;
  width: 4%;
}
.logo img{
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.text{
  margin-left: 10px;
}
.text h2{
  font-size: 1.5vw;
}
.user {
  /* float: right; */
  /* display: flex; */
  margin-left: auto;
  padding: 1%;
  border-radius: 20px;
  transition: all 0.3s ease;
}
.user h3 {
  margin: 0; /* 移除默认的外边距 */
  outline: none; /* 移除默认的焦点边框 */
}
.user:hover{
  background-color: #f4f4f5;
}
</style>
