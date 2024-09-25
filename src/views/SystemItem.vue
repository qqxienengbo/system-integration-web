<script setup>
import Cookies from 'js-cookie';
import { ref } from 'vue';
import axios from 'axios';

const user=ref(JSON.parse(Cookies.get('user')))
const push=()=>{
  const url=`http://10.119.61.205:8088/Login?account=${user.value.account}&password=${user.value.password}&secretKey=${user.value.secretKey}`
  window.open(url,'_blank')
}
</script>
<template>
  <div class="conten">
    <template v-for="i in 30" :key="i">
      <!-- <a href="https://www.baidu.com/" target="_blank"> -->
        <div class="item" @click="push(i)">
          <div class="logo">
            <img src="../assets/img/logo.png" alt="">
          </div>
          <div class="item-text">
            <h1>XXXXXXXXXXX系统</h1>
          </div>
        </div>
    </template>
  </div>
</template>

<style scoped>
.conten {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.item {
  width: 23%;
  height: 15%;
  float: left;
  background-color: #f4f4f5;
  margin: 0.5% 1%; /* 上下 0.5%，左右 1% */
  border-radius: 20px;
  display: flex; /* 启用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 左对齐 */
  padding: 1%; /* 内边距，用于内容与边框之间的间距 */
  transition: all 0.3s ease;
}

.logo {
  width: 20%;
  height: 100%;
  margin-right: 1%; /* 右边距 */
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片按比例缩放 */
}

.item-text {
  display: flex; /* 启用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  width: 80%; /* 占据剩余的空间 */
  /* color: #606266; */
  color: #551A8B;
}

.item-text h1 {
  margin: 0; /* 移除默认的外边距 */
  text-align: center; /* 文字水平居中 */
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 使用省略号表示被隐藏的内容 */
}

.item:hover {
  background-color: #e9e9eb;
  cursor: pointer; /* 设置手形光标 */
}
</style>