<template>
  <a-card :bordered="false">
    <div class="table-page">
      <a-form :form="groupForm">
        <a-form-item
          label="父组编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'fatherId',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入父组编码'
                  }
                ]
              }
            ]"
            placeholder="请输入父组编码"
          />
        </a-form-item>
        <a-form-item
          label="组编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'groupid',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入组编码'
                  }
                ]
              }
            ]"
            placeholder="请输入组编码"
          />
        </a-form-item>
        <a-form-item
          label="组名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'groupname',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入组名称'
                  }
                ]
              }
            ]"
            placeholder="请输入组名称"
          />
        </a-form-item>
        <a-form-item
          label="组图标链接"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'groupIconFile',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入组图标链接'
                  }
                ]
              }
            ]"
            placeholder="请输入组图标链接"
          />
        </a-form-item>
        <a-form-item
          label="组描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'groupdesc',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入组描述'
                  }
                ]
              }
            ]"
            placeholder="请输入组描述"
          />
        </a-form-item>
        <a-form-item
          label="客户端类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'clients',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入客户端类型'
                  }
                ]
              }
            ]"
            placeholder="支持的客户端类型，多个用“#”号隔开"
          />
        </a-form-item>
        <a-form-item
          label="排序依据"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'orderid',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入排序依据'
                  }
                ]
              }
            ]"
            placeholder="请输入排序依据"
          />
        </a-form-item>
        <a-form-item
          label="应用开关"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'closed',
              {
                rules: [
                  {
                    required: true,
                    message: ''
                  }
                ]
              }
            ]"
            placeholder=""
          />
        </a-form-item>
      </a-form>

      <a-form :form="funcForm">
        <a-form-item
          label="功能编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'id',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入功能编码'
                  }
                ]
              }
            ]"
            placeholder="请输入功能编码"
          />
        </a-form-item>
        <a-form-item
          label="功能名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入功能名称'
                  }
                ]
              }
            ]"
            placeholder="请输入功能名称"
          />
        </a-form-item>
        <a-form-item
          label="跳转链接"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'url',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入跳转链接'
                  }
                ]
              }
            ]"
            placeholder="请输入跳转链接"
          />
        </a-form-item>
        <a-form-item
          label="图标链接"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'iconFile',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入图标链接'
                  }
                ]
              }
            ]"
            placeholder="请输入图标链接"
          />
        </a-form-item>
        <a-form-item
          label="客户端类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'clients',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入客户端类型'
                  }
                ]
              }
            ]"
            placeholder="支持的客户端类型，多个用“#”号隔开"
          />
        </a-form-item>
        <a-form-item
          label="排序依据"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'orderid',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入排序依据'
                  }
                ]
              }
            ]"
            placeholder="请输入排序依据"
          />
        </a-form-item>
        <a-form-item
          label="首页排序依据"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'topid',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入首页排序依据'
                  }
                ]
              }
            ]"
            placeholder="请输入首页排序依据"
          />
        </a-form-item>
        <a-form-item
          label="匿名标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'anonymous',
              {
                rules: [
                  {
                    required: true,
                    message: ''
                  }
                ]
              }
            ]"
            placeholder=""
          />
        </a-form-item>
        <a-form-item
          label="停用标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'closed',
              {
                rules: [
                  {
                    required: true,
                    message: ''
                  }
                ]
              }
            ]"
            placeholder=""
          />
        </a-form-item>
        <a-form-item
          label="热点功能"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            v-decorator="[
              'ishot',
              {
                rules: [
                  {
                    required: true,
                    message: ''
                  }
                ]
              }
            ]"
            placeholder=""
          />
        </a-form-item>
      </a-form>

      <div class="operator">
        <a-button type="primary" @click="createGroup">新建菜单组</a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import moment from "moment";
// import http from "../../utils/http";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      labelCol: {
        lg: {span: 7},
        sm: {span: 7}
      },
      wrapperCol: {
        lg: {span: 10},
        sm: {span: 17}
      },
      groupForm: this.$form.createForm(this, {name: "groupForm"}),
      funcForm: this.$form.createForm(this, {name: "funcForm"})
    };
  },
  created() {
  },
  methods: {
    moment,
    createGroup() {
    }
  }
};
</script>
