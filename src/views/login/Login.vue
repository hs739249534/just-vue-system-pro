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

      <div class="main">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-alert
            v-if="login.errorMessage"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            :message="login.errorMessage"
          />

          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名"
              v-decorator="[
                'username',
                {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入用户名' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
              v-decorator="[
                'password',
                {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <!--<a-form-item>-->
          <!--  <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>-->
          <!--  <a class="forge-password" style="float: right;">忘记密码</a>-->
          <!--</a-form-item>-->

          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="login.buttonDisable"
              :disabled="login.buttonDisable"
              >确定
            </a-button>
          </a-form-item>

          <div class="user-login-other">
            <router-link class="register" :to="{ name: 'register' }"
              >注册账户</router-link
            >
          </div>
        </a-form>
      </div>

      <div class="footer">
        <div class="copyright">Copyright &copy; 2020 {{ copyright }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import http from "../../utils/http";
import * as types from "../../store/mutation-types";
import http from "../../utils/http";

export default {
  data() {
    return {
      login: {
        errorMessage: "",
        buttonDisable: false
      },
      form: this.$form.createForm(this)
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
    }
  },
  mounted() {
    const {
      form: { setFieldsValue }
    } = this;
    if (process.env.NODE_ENV !== "production") {
      setFieldsValue({
        username: "Fei",
        password: "123"
      });
    }
  },
  methods: {
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
          this.$ls.set("user", res);
          this.loginSuccess();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        login
      } = this;

      login.buttonDisable = true;

      validateFields(
        ["username", "password"],
        { force: true },
        async (err, values) => {
          if (err) {
            setTimeout(() => {
              login.buttonDisable = false;
            }, 1000);
          } else {
            http
              .post({
                url: "/doLogin",
                data: {
                  username: values.username,
                  password: values.password
                }
              })
              .then(res => {
                this.log(res);
                // this.$store.commit(types.SET_ACCESS_TOKEN, {
                //   access_token: res.access,
                //   expires_in: 1 * 24 * 60 * 1000
                // });
                this.$ls.set("user", {
                  username: values.username
                });
                this.getUserInfo();
                // this.loginSuccess();
              })
              .catch(err => {
                this.log(err);
                this.loginFailed();
              });
            // this.$store.commit(types.SET_ACCESS_TOKEN, {
            //   access_token: values.username,
            //   expires_in: 1 * 24 * 60 * 1000
            // });
            // this.$ls.set("user", {
            //   name: values.username
            // });
            // this.loginSuccess();
          }
        }
      );
    },
    loginSuccess() {
      this.login.errorMessage = "";
      this.login.buttonDisable = false;
      this.$router.push({ path: "/" });
    },
    loginFailed() {
      this.login.errorMessage = "用户名或密码错误，请重试";
      this.login.buttonDisable = false;
    }
  }
};
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

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

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
