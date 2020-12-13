<template>
  <div>
    <a-result status="success" title="操作成功"></a-result>
    <div style="width: 720px; background: #f7f7f7; margin: 0 auto">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="标题" v-if="adminInfoDto.postTitle">
          {{ adminInfoDto.postTitle }}
        </a-form-item>
        <a-form-item label="副标题" v-if="adminInfoDto.hsSecTitle">
          {{ adminInfoDto.hsSecTitle }}
        </a-form-item>
        <a-form-item label="任务类型" v-if="adminInfoDto.infoType">
          {{ adminInfoDto.infoType }}
        </a-form-item>
        <a-form-item label="消息类型" v-if="adminInfoDto.postTypeId">
          {{ adminInfoDto.postTypeId }}
        </a-form-item>
        <a-form-item label="内容" v-if="adminInfoDto.postContent">
          <p
            style="margin: 0; border: #999999 1px solid"
            v-html="adminInfoDto.postContent"
          ></p>
        </a-form-item>
        <a-form-item label="目标人群" v-if="adminInfoDto.targetPeople">
          {{ adminInfoDto.targetPeople }}
        </a-form-item>
        <a-form-item label="用户信息" v-if="adminInfoDto.userDtos.length > 0">
          {{ adminInfoDto.userDtos }}
        </a-form-item>
        <a-form-item label="创建时间" v-if="adminInfoDto.createDate">
          {{ adminInfoDto.createDate }}
        </a-form-item>
        <a-form-item label="发送时间" v-if="adminInfoDto.postDate">
          {{ adminInfoDto.postDate }}
        </a-form-item>
        <a-form-item label="终止时间" v-if="adminInfoDto.stopDate">
          {{ adminInfoDto.stopDate }}
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMsg3",
  props: {
    adminInfoDto: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.ant-result {
  padding: 8px 32px 24px;
}
.ant-form-item {
  margin-bottom: 0;
}
</style>
