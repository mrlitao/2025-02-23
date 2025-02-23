<script setup name="Users">
import { onBeforeMount } from "vue";
// hooks
import useUserStore from "@/stores/modules/user.js"
import http from "@/apis/index.js"

const userStore = useUserStore()
const queryUsers = () => {
  http.get("/users").then(response => {
    console.log({ response });
  })
}

const logout = () => {
  userStore.logout()
}


onBeforeMount(queryUsers)

</script>
<template>
  <div>
    users

    <el-button type="primary" @click="logout">登出</el-button>
  </div>
</template>

<style lang="scss" scoped></style>