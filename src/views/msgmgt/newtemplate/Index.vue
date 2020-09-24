<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新建模板"
      :breadcrumb="{ props: { routes } }"
    />
    <a-form
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      @submit="handleSubmit"
      style="margin: 64px 0"
    >
      <a-form-item label="模板类型">
        <a-select
          show-search
          placeholder="请选择"
          @change="handleChangeTemplate"
        >
          <a-select-option value="腾讯云短信">
            腾讯云短信
          </a-select-option>
          <a-select-option value="微信推送">
            微信推送
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="模板ID">
        <a-input placeholder="请输入模板ID" />
      </a-form-item>
      <a-form-item label="模板名称">
        <a-input placeholder="请输入模板名称" />
      </a-form-item>
      <a-form-item label="模板内容">
        <a-textarea
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请输入模板内容"
        />
      </a-form-item>
    </a-form>
    <div
      class="steps-action"
      style="justify-content: center; display: flex; margin: 24px 0"
    >
      <a-button type="primary" @click="handleSubmit">
        提交
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "msgMgt-newTemplate",
  data() {
    return {
      routes: [
        {
          path: "index",
          breadcrumbName: "一级菜单"
        },
        {
          path: "first",
          breadcrumbName: "二级菜单"
        },
        {
          path: "second",
          breadcrumbName: "新建消息模板"
        }
      ]
    };
  },
  methods: {
    handleChangeTemplate(value) {
      console.log(value);
    },
    handleSubmit() {
      this.$router.push("/msgMgt/msgTemplate");
    }
  }
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
