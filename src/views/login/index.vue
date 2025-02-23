<script setup name="Login">
import { ref, shallowRef } from 'vue'
import useUserStore from "@/stores//modules/user.js"
// apis
import http from "@/apis/index.js"
import { getCsrfCookie } from "@/apis/app.js"

const userStore = useUserStore()

getCsrfCookie().then(response => {
  console.log({ response });
  
})
const formRef = shallowRef()
const formObject = ref({
  email: "test@example.com",
  password: "password"
})
                                          `                                         `
const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
  ]
}

const loginHandler = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    userStore.loginHandler(formObject.value)
  })

}
</script>

<template>
  <div class="login-wrapper">
    <el-form ref="formRef" :model="formObject" :rules="rules" label-width="70px" class="login-form">
      <el-form-item label="用户名" prop="email">
        <el-input v-model="formObject.email" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formObject.password" clearable />
      </el-form-item>
      <div class="login-button">
        <el-button type="primary" block @click="loginHandler">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss">
.login {

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  &-form {
    padding: 30px 20px 10px;
    border-radius: 8px;
    width: 300px;
    height: max-content;
    box-shadow: 0 0 10px #ccc;
  }
}

.login-button {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}
</style>