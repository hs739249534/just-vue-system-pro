<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="基本信息"
    />
    <div class="page-content">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
        <a-form-item label="账号">
          <a-input v-model="user.username" disabled />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="user.email" disabled />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model="user.name" />
        </a-form-item>
        <a-form-item label="手机">
          <a-input v-model="user.phoneNum" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
          <a-button type="primary" html-type="submit" @click="changeInfo">
            修改
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import http from "../../utils/http";
import { title } from "../../router";

export default {
  name: "msgMgt-msgTemplate",
  data() {
    return {
      user: {
        username: "",
        email: "",
        name: "",
        phoneNum: ""
      }
    };
  },
  mounted() {
    this.getUserInfo();
    this.getAllInfo();
  },
  methods: {
    getAllInfo() {
      http
        .get({
          url: "/api/user/getAllInfo"
        })
        .then(res => {
          console.log("员工信息", res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserInfo() {
      http
        .get({
          url: "/api/user/getUserInfo",
          params: {
            username: this.$ls.get("user").username
          }
        })
        .then(res => {
          console.log("userInfo", res);
          this.user = res;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    changeInfo() {
      http
        .put({
          url: "/api/user/changeUserInfo",
          data: {
            id: this.user.id,
            name: this.user.name,
            phoneNum: this.user.phoneNum
          }
        })
        .then(res => {
          console.log(res);
          this.$success({
            title: "成功！",
            content: "修改成功"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.page-content {
  padding: 24px 32px;
}
</style>
