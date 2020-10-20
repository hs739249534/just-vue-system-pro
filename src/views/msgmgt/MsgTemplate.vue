<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="消息模版管理"
      :breadcrumb="{ props: { routes } }"
    />
    <div class="page-content">
      <a-row type="flex">
        <a-col style="width: 70px; line-height: 32px">
          <p>
            模板名称：
          </p>
        </a-col>
        <a-col style="margin-right: 24px">
          <a-input style="width: 264px" placeholder="请输入" />
        </a-col>
        <a-col style="width: 70px; line-height: 32px">
          <p>
            模板类型：
          </p>
        </a-col>
        <a-col style="margin-right: 24px">
          <a-select
            show-search
            placeholder="请选择"
            style="width: 264px"
            @change="handleChangeTask"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="tom">
              Tom
            </a-select-option>
          </a-select>
        </a-col>
        <a-col style="width: 65px; margin: 0 4px">
          <a-button type="primary">
            查询
          </a-button>
        </a-col>
        <a-col style="width: 65px; margin: 0 4px">
          <a-button>
            重置
          </a-button>
        </a-col>
      </a-row>
      <hr
        style="background-color: #ebedf0; border: none; height: 1px; margin: 8px 0"
      />
      <div style="padding: 16px 0">
        <router-link to="/msgMgt/newTemplate">
          <a-button type="primary"><a-icon type="plus" />新建</a-button>
        </router-link>
      </div>
      <a-table
        :columns="columns"
        :row-key="record => record.key"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:" @click="changeTemplate(record)">修改 </a>
          <a-popconfirm title="确定要删除吗?">
            <a href="javascript:"> 删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-modal
      title="模板修改"
      :visible="changeTemplateVisable"
      @ok="handleTemplateOk"
      @cancel="handleTemplateCancel"
    >
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="模板类型">
          <a-select
            show-search
            placeholder="请选择"
            :default-value="templateData.templateType"
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
          <a-input
            placeholder="请输入模板ID"
            v-model="templateData.templateID"
          />
        </a-form-item>
        <a-form-item label="模板名称">
          <a-input
            placeholder="请输入模板名称"
            v-model="templateData.templateName"
          />
        </a-form-item>
        <a-form-item label="模板内容">
          <a-textarea
            v-model="templateData.content"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入模板内容"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import http from "../../utils/http";

const columns = [
  {
    title: "编号",
    dataIndex: "id",
    width: "64px"
  },
  {
    title: "模板类型",
    dataIndex: "templateType"
  },
  {
    title: "模板ID",
    dataIndex: "templateID"
  },
  {
    title: "模板名称",
    dataIndex: "templateName"
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  name: "msgMgt-msgTemplate",
  data() {
    return {
      routes: [
        {
          path: "/msgMgt/msgTemplate",
          breadcrumbName: "消息模版管理"
        }
      ],
      data: [
        {
          key: "1",
          id: "1",
          templateType: "腾讯云短信",
          templateID: "1111111111",
          templateName: "省一体化短信验证码",
          content:
            "为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码为您的登录验证码"
        }
      ],
      templateData: [],
      pagination: {},
      loading: false,
      changeTemplateVisable: false,
      columns
    };
  },
  methods: {
    handleChangeTask(value) {
      console.log(`selected ${value}`);
    },
    handleTemplateOk() {
      this.changeTemplateVisable = false;
    },
    handleTemplateCancel() {
      this.changeTemplateVisable = false;
    },
    changeTemplate(record) {
      this.changeTemplateVisable = true;
      this.templateData = record;
    },
    // handleTableChange(pagination, filters, sorter) {
    //   console.log(pagination);
    //   const pager = { ...this.pagination };
    //   pager.current = pagination.current;
    //   this.pagination = pager;
    //   this.fetch({
    //     results: pagination.pageSize,
    //     page: pagination.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters
    //   });
    // },
    // fetch(params = {}) {
    //   console.log("params:", params);
    //   this.loading = true;
    //   http
    //     .get({
    //       url: "https://randomuser.me/api",
    //       data: {
    //         results: 10,
    //         ...params
    //       }
    //     })
    //     .then(data => {
    //       const pagination = { ...this.pagination };
    //       // Read total count from server
    //       // pagination.total = data.totalCount;
    //       pagination.total = 200;
    //       this.loading = false;
    //       this.data = data.results;
    //       this.pagination = pagination;
    //     });
    // }
  }
};
</script>

<style scoped>
.page-content {
  padding: 24px 32px;
}
</style>
