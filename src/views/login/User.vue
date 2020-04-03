<template>
  <div></div>
</template>

<script>
import http from "../../utils/http";

export default {
  name: "User",
  created() {
    http
      .get({
        url: "api/v1/user"
      })
      .then(ret => {
        this.log("current user", ret);
        this.$ls.set("user", ret);
        this.$router.replace("/");
      })
      .catch(err => {
        this.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.user {
}
</style>
