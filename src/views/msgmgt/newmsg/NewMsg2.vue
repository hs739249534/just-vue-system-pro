<template>
  <div>
    <a-form
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      @submit="handleSubmit"
    >
      <a-form-item label="任务类型">
        <a-select show-search placeholder="请选择" @change="handleChangeTask">
          <a-select-option value="极光推送">
            极光推送
          </a-select-option>
          <a-select-option value="腾讯云短信">
            腾讯云短信
          </a-select-option>
          <a-select-option value="微信推送">
            微信推送
          </a-select-option>
          <a-select-option value="邮件推送">
            邮件推送
          </a-select-option>
          <a-select-option value="应用内推送">
            应用内推送
          </a-select-option>
        </a-select>
      </a-form-item>
      <!--      <div style="height: 240px;">-->
      <a-form-item label="邮箱地址" v-if="taskType === '邮件推送'">
        <a-input placeholder="请输入邮箱地址" />
      </a-form-item>
      <a-form-item label="消息类型" v-if="taskType === '应用内推送'">
        <a-select
          show-search
          placeholder="请选择"
          @change="handleChangeMsgType"
        >
          <a-select-option value="通知公告">
            通知公告
          </a-select-option>
          <a-select-option value="政策法规">
            政策法规
          </a-select-option>
          <a-select-option value="紧急通知">
            紧急通知
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="标题"
        v-if="
          taskType === '极光推送' ||
            taskType === '邮件推送' ||
            taskType === '应用内推送'
        "
      >
        <a-input placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        label="副标题"
        v-if="
          taskType === '极光推送' ||
            taskType === '邮件推送' ||
            taskType === '应用内推送'
        "
      >
        <a-input placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        label="内容"
        v-if="
          taskType === '极光推送' ||
            taskType === '邮件推送' ||
            taskType === '应用内推送'
        "
      >
        <a-textarea
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请输入内容"
        />
      </a-form-item>
      <a-form-item
        label="选择模板"
        v-if="taskType === '腾讯云短信' || taskType === '微信推送'"
      >
        <a-input placeholder="请选择模板" />
      </a-form-item>
      <!--      </div>-->
      <a-form-item label="推送时间">
        <a-radio-group v-model="isTiming">
          <a-radio :value="false">
            立即推送
          </a-radio>
          <a-radio :value="true">
            定时推送
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="选择日期" v-if="isTiming">
        <a-date-picker show-time format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "NewMsg2",
  data() {
    return {
      taskType: "",
      msgType: "",
      isTiming: false
    };
  },
  methods: {
    handleChangeTask(value) {
      this.taskType = value;
      console.log(this.taskType, this.msgType);
    },
    handleChangeMsgType(value) {
      this.msgType = value;
    },
    handleSubmit() {}
  }
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
