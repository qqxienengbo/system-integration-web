<script setup>
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import request from '@/http/request';

const user=ref(Cookies.get('user')?JSON.parse(Cookies.get('user')):{})

/**
 * 打开对应网站
 */
const push=(item)=>{
  // const url=itemurl+`?account=${user.value.account}&password=${user.value.password}&secretKey=${user.value.secretKey}`
  const account=encodeURIComponent(item.uact)//进行url编码，防止+等符号乱码，在另一边获取不到完整数据
  // const password=encodeURIComponent(item.upaw)
  const secretKey=encodeURIComponent(user.value.secretKey)
  const url=item.urlItem.url+'?account='+account+'&secretKey='+secretKey
  window.open(url,'_blank')
}

const urllist=ref([])
const getUrlList=()=>{
  request.get("/userurl/getuserurllist",{params:{
    account:user.value.account,
    secretKey:user.value.secretKey
  }}).then(res=>{
    if(res.code==='0'){
      urllist.value=res.data
    }
  })
}
getUrlList()

</script>
<template>
  <div class="conten">
    <template v-for="item in urllist" :key="item">
        <div class="item" @click="push(item)">
          <div class="logo">
            <el-image :src="item.urlItem.logo ? 'http://localhost:8888/api/files/' + item.urlItem.logo : 'http://localhost:8888/api/files/默认图标.png'" 
            style="border-radius: 25%;"/>
          </div>
          <div class="item-text">
            <el-tooltip effect="dark" :content="item.urlItem.sysname" placement="top">
              <h1>{{ item.urlItem.sysname }}</h1>
            </el-tooltip>
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

.logo el-img {
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