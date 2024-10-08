<script setup>
import file from '@/http/file';
import request from '@/http/request';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const urldata=ref([])
const getAllUrlData=()=>{
    request.post("/urlitem/getalldata").then(res=>{
        if(res.code==='0'){
            urldata.value=res.data
        }else{
            ElMessage.error('系统异常')
        }
    })
}
getAllUrlData()



//是否展示新增系统信息对话框
const urlDialogVisible = ref(false)

//记录新增的系统信息
const newurldata = ref({})
//记录要上传的图标文件
const logofile=ref([])

/**
 * 打开添加系统的对话框
 */
const showurldialog=()=>{
    newurldata.value={}
    logofile.value=[]
    urlDialogVisible.value=true
}

const addurl=()=>{
    if(newurldata.value.url&&newurldata.value.sysname){
        request.get("/urlitem/addUrlItem",{params:{
        url:newurldata.value.url,
        sysname:newurldata.value.sysname
    }}).then(res=>{
        if(res.code==='0'){
            console.log(logofile.value)
            if(logofile.value.length>0){
                let fileData = new FormData()
                fileData.append('file', logofile.value[0].raw)
                fileData.append('urlid',res.data)
                file.post("/files/uplogo",fileData).then(response=>{
                    if(response.data.code==='0'){
                        getAllUrlData()
                        ElMessage.success("添加系统成功！")
                    }
                })
            }
        }
    })
    }else{
        ElMessage.error("系统名称和访问网址不能为空！")
    }
    urlDialogVisible.value=false
}

/**
 * 文件数量超出限制时
 */
const handleExceed=()=>{
    ElMessage.warning("只能上传一个文件,请先删除再选择!")
}
/**
 * 判断文件类型是否是图片类型
 */
const isfiletype=()=>{
    const fileName=logofile.value[0].name
    const extension=fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
    if(extension==='png'||extension==='jpg'||extension==='jpeg'){

    }else{
        ElMessage.error('文件类型不符合,请重新选择!')
        logofile.value=[]
    }
}
/**
 * 删除网站
 * @param url 
 */
 const remove = (url) => {
    request.post("/urlitem/removeurl", url).then(res => {
        if (res.code === '0') {
            ElMessage.success("删除成功！")
        }
        getAllUrlData();
    })
}
</script>
<template>
    <div class="content">
        <div class="search-container">
            <el-button type="success" style="margin-left: 10px;" @click="showurldialog">添加系统</el-button>
        </div>
        <div>
            <el-table :data="urldata" height="500" border>
                <el-table-column prop="logo" label="logo" align="center">
                    <template #default="scope">
                        <el-image :src="scope.row.logo
                        ?'http://localhost:8888/api/files/logo/' + scope.row.logo
                        : 'http://localhost:8888/api/files/logo/默认图标.png'
                        " style="border-radius: 25%;width: 25%;" fit="cover">

                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="sysname" label="系统名称" align="center" />
                <el-table-column prop="url" label="网址" align="center" />
                <el-table-column label="删除" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除该系统吗?" @confirm="remove(scope.row)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog v-model="urlDialogVisible" title="添加系统" width="30%" center>
                <el-form v-model="newurldata" style="width: 100%;">
                    <el-form-item label="系统名称" prop="sysname">
                        <el-input v-model="newurldata.sysname"></el-input>
                    </el-form-item>
                    <el-form-item label="访问网址" prop="url">
                        <el-input v-model="newurldata.url"></el-input>
                    </el-form-item>
                    <el-form-item label="系统图标">
                        <el-upload v-model:file-list="logofile" 
                        :limit="1" 
                        :on-exceed="handleExceed" 
                        :auto-upload="true"
                        :http-request="isfiletype"
                        accept=".png,.jpeg,.jpg"
                        list-type="picture"
                        >
                            <template #trigger>
                                <el-button type="primary">选择文件</el-button>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="urlDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="addurl">确定</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>
.content {
    width: 80vw;
    height: 83vh;
    margin: auto auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 20px;
}
.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /* 根据需要调整间距 */
}
.el-table {
    width: 100%;
    font-size: 14px;
    color: #333;
    border-radius: 20px;
}

.el-table th,
.el-table td {
    padding: 10px 0;
}

.el-table .el-button {
    padding: 8px 15px;
}

.expand-div {
    width: 100%;
    max-height: 500px;
}

.drawer-content {
    max-height: 580px;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
}

</style>