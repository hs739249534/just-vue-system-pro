<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="top">
        <div class="header">
          <a>
            <!--<img src="~@/assets/img/logo.png" class="logo" alt="logo" />-->
            <img :src="logo" class="logo" alt="logo" />
            <span class="title">{{ title }}</span>
          </a>
        </div>
        <div class="desc">{{ subTitle }}</div>
      </div>
      <a-result
        :isSuccess="true"
        :content="false"
        :title="email"
        :sub-title="description"
      >
        <template #extra>
          <a-button size="large" type="primary">查看邮箱</a-button>
          <a-button size="large" style="margin-left: 8px" @click="goHomeHandle"
            >返回首页</a-button
          >
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterResult",
  data() {
    return {
      description:
        "激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。",
      form: {}
    };
  },
  computed: {
    title() {
      return this.$ls.get("CONFIG").title;
    },
    subTitle() {
      return this.$ls.get("CONFIG").subTitle;
    },
    copyright() {
      return this.$ls.get("CONFIG").copyright;
    },
    logo() {
      return this.$ls.get("CONFIG").logo;
    },
    email() {
      const v = (this.form && this.form.email) || "xxx";
      return `你的账户：${v} 注册成功`;
    }
  },
  created() {
    this.form = this.$route.params;
  },
  methods: {
    goHomeHandle() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/img/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}
</style>
