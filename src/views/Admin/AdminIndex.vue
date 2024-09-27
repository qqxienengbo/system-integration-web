<script setup>
import request from '@/http/request';
import { ref } from 'vue';

const userdata = ref([]);

const getAllData = () => {
  request.get("/user/getalldata").then(res => {
    if (res.code === '0') {
      const transformedData = res.data.map(user => {
        if (user.userUrlList) {
          user.userUrlList = user.userUrlList.map(urlitem => {
            urlitem.urlItem.limits = urlitem.urlItem.limits === 'true'; // 将 'true' 转换为 true，'false' 转换为 false
            return urlitem;
          });
        }
        return user;
      });

      userdata.value = transformedData;
      console.log(transformedData);
    } else {
      console.error('Failed to fetch data:', res);
    }
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
};

getAllData();
//抽屉是否展示
const drawervalue=ref(false)
//打开的抽屉的信息
const oneuserdata=ref(null)
/**
 * 点击修改按钮，弹出抽屉以及相关的用户网站权限信息
 * @param userUrlList 
 */
const openlimits=(userUrlList)=>{
  oneuserdata.value=userUrlList
  drawervalue.value=true
  console.log(userUrlList)
}

const changelimits=()=>{
    
}
</script>
<template>
    <div class="content">
      <div>
      </div>
      <div>
        <el-table :data="userdata">
          <!-- <el-table-column type="expand">
            <template #default="props">
              <div class="expand-div">
                <template v-for="urlitem in props.row.userUrlList" :key="urlitem.id">
                  <div class="flex-row" style="width: 99%; height: 50px; background-color: #c6e2ff; margin: 5px; border-radius: 20px;">
                    <h3 class="sysname">{{ urlitem.urlItem.sysname }}</h3>
                    <el-switch v-model="urlitem.urlItem.limits" class="switch" />
                  </div>
                </template>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="username" label="姓名" align="center" />
          <el-table-column prop="account" label="账号" align="center" />
          <el-table-column prop="password" label="密码" align="center" />
          <el-table-column label="权限" prop="userUrlList" align="center">
            <template #default="scope">
            <el-button type="success" @click="openlimits(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-drawer v-model="drawervalue" direction="rtl">
    <template #header>
      <h4>{{ oneuserdata?.username }}--网站权限</h4>
    </template>
    <template #default>
      <div class="drawer-content">
        <div v-for="item in oneuserdata.userUrlList" :key="item" class="urlitem">
            <div class="logo">
            <el-image :src="item.urlItem.logo ? 'http://localhost:8888/api/files/' + item.urlItem.logo : 'http://localhost:8888/api/files/默认图标.png'" 
            style="border-radius: 25%;"/>
          </div>
            <h5>{{ item?.urlItem?.sysname }}</h5>
            <el-switch v-model="item.urlItem.limits" class="switch" :change="changelimits()" />
        </div>
      </div>
    </template>
  </el-drawer>
      </div>
    </div>
  </template>
  
  <style scoped>
  .content {
    width: 60vw;
    height: 100vh;
    margin: auto auto;
  }
  
  .el-table {
    max-height: 600px;
  }
  
  .expand-div {
    width: 100%;
    max-height: 500px;
  }
  .drawer-content {
  max-height: 580px; /* 你可以根据需要调整这个高度 */
  overflow-y: auto;
  padding: 10px;
}
/* 自定义滚动条样式 */
.drawer-content::-webkit-scrollbar {
  width: 7px; /* 滚动条的宽度 */
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道的背景色 */
  border-radius: 3px; /* 滚动条轨道的圆角 */
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #888; /* 滚动条滑块的背景色 */
  border-radius: 3px; /* 滚动条滑块的圆角 */
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滚动条滑块悬停时的背景色 */
}
  .urlitem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
.logo {
  width: 10%;
  height: 50%;
  margin-right: 1%; /* 右边距 */
}

.logo el-img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片按比例缩放 */
}
.sysname {
  flex: 1;
  margin-right: 10px;
}

.switch {
  margin-left: 10px;
}

  </style>