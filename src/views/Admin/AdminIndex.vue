<script setup>
import file from "@/http/file";
import request from "@/http/request";
import { ElMessage, ElMessageBox, genFileId } from "element-plus";
import { ref } from "vue";

const userdata = ref([]);

const getAllData = () => {
    request.get("/user/getalldata").then((res) => {
        if (res.code === "0") {
            const transformedData = res.data.map((user) => {
                if (user.userUrlList) {
                    user.userUrlList = user.userUrlList.map((urlitem) => {
                        urlitem.limits = urlitem.limits === "true"; //把limits变成开关可以识别的布尔值
                        return urlitem;
                    });
                }
                return user;
            });
            userdata.value = transformedData;
        }
    });
};

getAllData();
//抽屉是否展示
const drawervalue = ref(false);
//打开的抽屉的信息
const oneuserdata = ref(null);
/**
 * 点击修改按钮，弹出抽屉以及相关的用户网站权限信息
 * @param userUrlList
 */
const openlimits = (userUrlList) => {
    oneuserdata.value = userUrlList;
    drawervalue.value = true;
};

/**
 * 更新网站权限
 * @param userUrl
 */
const changelimits = (userUrl) => {
    request.post("/userurl/updatelimits", userUrl);
};
/**
 * 更新用户登录对应网站的账号
 * @param item
 */
const updateuact = (item) => {
    request.post("/userurl/updateuact", item);
};

//记录查询的姓名
const username = ref('')

/**
 * 根据姓名查询用户信息
 */
const selectUserDataByUserName = () => {
    if (username.value) {
        request.get("/user/selectUserDataByUserName", {
            params: {
                username: username.value
            }
        }).then(res => {
            if (res.code === '0') {
                const transformedData = res.data.map((user) => {
                    if (user.userUrlList) {
                        user.userUrlList = user.userUrlList.map((urlitem) => {
                            urlitem.limits = urlitem.limits === "true"; //把limits变成开关可以识别的布尔值
                            return urlitem;
                        });
                    }
                    return user;
                });
                userdata.value = transformedData;
            }
        })
    } else {
        getAllData();
    }
}

//是否显示新增用户的消息对话框
const centerDialogVisible = ref(false)

/**
 * 点击新增用户按钮
 */
const showuserdialog = () => {
    newuserdate.value = {}
    centerDialogVisible.value = true
}
//记录新增的用户信息
const newuserdate = ref({})

/**
 * 添加新用户
 */
const adduser = () => {
    if (newuserdate.value.account && newuserdate.value.password && newuserdate.value.username) {
        request.post("user/adduser", newuserdate.value).then(res => {
            if (res.code === '0') {
                getAllData();
                ElMessage.success('添加成功！')
            }
        })
        centerDialogVisible.value = false
    } else {
        ElMessage.error("请填写完整信息！")
    }
}

/**
 * 删除用户
 * @param user 
 */
const remove = (user) => {
    request.post("/user/removeuser", user).then(res => {
        if (res.code === '0') {
            ElMessage.success("删除成功！")
        }
        getAllData();
    })
}

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
    // if(newurldata.value.url&&newurldata.value.sysname){
    //     request.get("/urlitem/addUrlItem",{params:{
    //     url:newurldata.value.url,
    //     sysname:newurldata.value.sysname
    // }}).then(res=>{
    //     if(res.code==='0'){
    //         if(logofile.value.length>0){
    //             let fileData = new FormData()
    //             fileData.append('file', logofile.value[0].raw)
    //             fileData.append('urlid',res.data)
    //             file.post("/files/uplogo",fileData).then(response=>{
    //                 if(response.data.code==='0'){
    //                     getAllData()
    //                     ElMessage.success("添加系统成功！")
    //                 }
    //             })
    //         }
    //     }
    // })
    // }else{
    //     ElMessage.error("系统名称和访问网址不能为空！")
    // }
    // urlDialogVisible.value=false
}

/**
 * 文件数量超出限制时
 */
const handleExceed=()=>{
    ElMessage.warning("只能上传一个文件,请先删除再选择!")
}

const isfiletype=()=>{
    //获取文件后缀比较
    // if(logofile){

    // }
    console.log(logofile.value)
}

</script>
<template>
    <div class="content">
        <div class="search-container">
            <el-input v-model="username" placeholder="请输入姓名" style="width: 200px;" prefix-icon="el-icon-search"
                @keyup.enter="selectUserDataByUserName"></el-input>
            <el-button type="primary" style="margin-left: 10px;" @click="selectUserDataByUserName">查询</el-button>
            <el-button type="success" style="margin-left: 10px;" @click="showuserdialog">添加用户</el-button>
            <el-button type="success" style="margin-left: 10px;" @click="showurldialog">添加系统</el-button>
        </div>
        <div>
            <el-table :data="userdata" height="500" border>
                <el-table-column prop="username" label="姓名" align="center" />
                <el-table-column prop="account" label="账号" align="center" />
                <el-table-column prop="password" label="密码" align="center" />
                <el-table-column label="权限" prop="userUrlList" align="center">
                    <template #default="scope">
                        <el-button type="success" @click="openlimits(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除该用户吗?" @confirm="remove(scope.row)">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-drawer v-model="drawervalue" direction="rtl" size="50%">
                <template #header>
                    <h4>{{ oneuserdata?.username }}--网站权限</h4>
                </template>
                <template #default>
                    <div class="drawer-content">
                        <div v-for="item in oneuserdata.userUrlList" :key="item" class="urlitem">
                            <div class="logo">
                                <el-image :src="item.urlItem.logo
                                    ? 'http://localhost:8888/api/files/logo/' + item.urlItem.logo
                                    : 'http://localhost:8888/api/files/logo/默认图标.png'
                                    " style="border-radius: 25%" fit="cover" />
                            </div>
                            <h5 style="min-width: 40%">{{ item?.urlItem?.sysname }}</h5>
                            <el-input v-model="item.uact" style="width: 15%" @change="updateuact(item)"></el-input>
                            <el-switch v-model="item.limits" class="switch" @change="changelimits(item)" />
                        </div>
                    </div>
                </template>
            </el-drawer>
        </div>
        <div>
            <el-dialog v-model="centerDialogVisible" title="添加用户" width="25%" center>
                <el-form v-model="newuserdate" style="width: 100%;">
                    <el-form-item label="姓名" prop="username">
                        <el-input v-model="newuserdate.username"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="newuserdate.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="newuserdate.password"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="adduser">确定</el-button>
                    </div>
                </template>
            </el-dialog>
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

/* 自定义滚动条样式 */
.drawer-content::-webkit-scrollbar {
    width: 7px;
    /* 滚动条的宽度 */
}

.drawer-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 滚动条轨道的背景色 */
    border-radius: 3px;
    /* 滚动条轨道的圆角 */
}

.drawer-content::-webkit-scrollbar-thumb {
    background: #888;
    /* 滚动条滑块的背景色 */
    border-radius: 3px;
    /* 滚动条滑块的圆角 */
}

.drawer-content::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 滚动条滑块悬停时的背景色 */
}

.urlitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
}

.logo {
    width: 7%;
    margin-right: 1%;
    /* 右边距 */
}

.logo el-img {
    object-fit: contain;
    /* 确保图片按比例缩放 */
}

.sysname {
    flex: 1;
    margin-right: 10px;
}

.switch {
    margin-left: 10px;
}

.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    /* 根据需要调整间距 */
}

.search-container .el-button:hover,
.search-container .el-button:focus {
    border-color: #66b1ff;
    /* 悬停时边框颜色 */
}
</style>