<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="工作平台"
    >
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">{{ timeFix }}，{{ user.username }}</div>
          <div>软件工程师 | 河北东软 - XXXX部 - XX平台</div>
        </div>
      </div>
    </a-page-header>
  </div>
</template>

<script>
// import http from "../../utils/http";
// import moment from "moment";
import { timeFix } from "../../utils/util";
export default {
  data() {
    return {
      timeFix: timeFix(),
      user: this.$ls.get("user"),
      data: []
    };
  },
  computed: {
    currentUser() {
      return {
        name: "Serati Ma",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
      };
    }
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="less">
/*@import "~ant-design-vue/es/style/themes/default.less";*/
.page-header-content {
  display: flex;

  .avatar {
    flex: 0 1 72px;

    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    /*<!--color: @text-color-secondary;-->*/
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      /*<!--color: @heading-color;-->*/
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
.page-content {
  padding: 24px 32px;
}
.ant-row {
  margin-bottom: 0;
}
</style>
