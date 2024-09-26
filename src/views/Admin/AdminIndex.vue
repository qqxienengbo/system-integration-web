<script setup>
import request from '@/http/request';
import { ref } from 'vue'
const userdata=ref([])
const getAllData=()=>{
    request.get("/user/getalldata").then(res=>{
        if(res.code==='0'){
            userdata.value=res.data
            console.log(res.data)
        }
    })
}
getAllData()

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
    <el-table :data="tableData" >
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
    </el-table>
</template>