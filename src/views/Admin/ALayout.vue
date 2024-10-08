<script setup>
import router from "@/router";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" style="height: 100%">
        <el-menu
          default-active="AUserM"
          class="el-menu-vertical-demo"
          router
          style="border: none; height: 100%"
        >
          <el-menu-item index="AUserM">
            <el-icon
              ><el-icon>
                <User /> </el-icon
            ></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="ASystemM">
            <el-icon>
              <setting />
            </el-icon>
            <span>系统管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-main {
  padding-top: 0;
  padding-bottom: 0;
}
</style>