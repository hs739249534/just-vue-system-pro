<template>
  <div class="exception-401">
    <div class="no-data">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
        alt="no data"
      />
      <div class="tip">您的认证权限已失效</div>
      <div class="btn" @click="$router.replace('/login')"><a>重试</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exception-401"
};
</script>

<style lang="less" scoped>
@import "../../assets/less/default";

.exception-401 {
  width: 100%;
  min-height: 100vh;
  background: @fill-grey;

  &:after {
    content: "";
    display: table;
  }

  &:before {
    content: "";
    display: table;
  }

  .no-data {
    text-align: center;

    img {
      margin-top: 62px;
      margin-bottom: 35px;
      width: 135px;
      height: 105px;
    }

    .tip {
      height: 25px;
      font-size: 18px;
      font-weight: 600;
      color: @color-text-placeholder;
      line-height: 25px;
    }

    .btn {
      margin-top: 10px;
      height: 25px;
      font-size: 18px;
      font-weight: 600;
      color: @color-text-placeholder;
      line-height: 25px;
      text-decoration: underline;
    }
  }
}
</style>
