<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-divider class="custom-divider"/>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-container{
  width: 100vw;
  height: 100vh;
}
.el-header{
  width: 100vw;
  height: 10vh;
}
.el-main{
  width: 100vw;
  height: 90vh;
}
.custom-divider {
  margin: 0; /* 移除默认的外边距 */
  border-top: 1px solid #e0e0e0; /* 设置顶部边框 */
  border-bottom: none; /* 移除底部边框 */
}
</style>
