<script setup>
import { onMounted, ref, watch } from 'vue';
import Cookies from 'js-cookie';
import { decryptAES } from '@/util/crypto';
import { ElMessage } from 'element-plus';
import request from '@/http/request';
import router from '@/router';
const user = ref(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {})
const account = ref(decryptAES(user.value.account, user.value.secretKey))
onMounted(() => {

})

//是否显示修改密码对话框
const centerDialogVisible = ref(false)

//记录填写的密码信息
const pawdata = ref({
    account:account
})

const updatepassword = () => {
    if(pawdata.value.oldpaw === decryptAES(user.value.password, user.value.secretKey)){
        if (pawdata.value.newpaw === pawdata.value.surepaw) {
            request.post("/user/updatepaw",pawdata.value).then(res=>{
                if(res.code==='0'){
                    ElMessage.success("密码已修改，请重新登录！")
                    Cookies.remove("user")
                    router.push("/Login")
                }else{
                    ElMessage.error(res.msg)
                }
            })
    } else {
        ElMessage.error("两次密码不一致!")
    }
    }else{
        ElMessage.error("原密码不正确!")
    }

    centerDialogVisible.value = false
}

</script>
<template>
    <div>
        <div>
            <el-descriptions title="我的信息" border>
                <el-descriptions-item :rowspan="2" :width="140" label="头像" align="center">
                    <el-image style="width: 100px; height: 100px"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </el-descriptions-item>
                <el-descriptions-item label="姓名">{{ user?.username }}</el-descriptions-item>
                <el-descriptions-item label="账号">{{ account }}</el-descriptions-item>
                <el-descriptions-item label="电话">18100000000</el-descriptions-item>
                <el-descriptions-item label="职位">
                    <el-tag size="small">数字化工程师</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="编辑" align="center">
                    <el-button type="primary" @click="centerDialogVisible = true">修改密码</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <el-dialog v-model="centerDialogVisible" width="450" center>
                <template #footer>
                    <el-form label-width="80" v-model="pawdata">
                        <el-form-item label="旧密码" prop="oldpaw">
                            <el-input v-model="pawdata.oldpaw"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpaw">
                            <el-input v-model="pawdata.newpaw"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="surepaw">
                            <el-input v-model="pawdata.surepaw"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="updatepassword">
                            确定
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>

</template>


<style scoped></style>