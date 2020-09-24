<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="消息通知"
      :breadcrumb="{ props: { routes } }"
    />
    <div class="page-content">
      <a-row type="flex">
        <a-col style="width: 70px; line-height: 32px">
          <p>
            任务描述：
          </p>
        </a-col>
        <a-col style="margin-right: 24px">
          <a-input style="width: 264px" placeholder="请输入" />
        </a-col>
        <a-col style="width: 70px; line-height: 32px">
          <p>
            任务类型：
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
        <router-link to="/msgMgt/newMsg">
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
          <a-popconfirm>
            <a href="javascript:">详情</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import http from "../../utils/http";

const columns = [
  {
    title: "任务描述",
    dataIndex: "rwms"
  },
  {
    title: "目标人群",
    dataIndex: "mbrq"
  },
  {
    title: "任务类型",
    dataIndex: "rwlx"
  },
  {
    title: "操作人",
    dataIndex: "czr"
  },
  {
    title: "创建时间",
    dataIndex: "cjsj"
  },
  {
    title: "发送时间",
    dataIndex: "fssj"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  name: "msgMgt-msgList",
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
          breadcrumbName: "消息通知"
        }
      ],
      data: [
        {
          key: "1",
          rwms: "测试短信发送",
          mbrq: "全部用户",
          rwlx: "腾讯云短信",
          czr: "管理员",
          cjsj: "2016-09-21  08:50:08",
          fssj: "2016-09-21  08:50:08"
        }
      ],
      pagination: {},
      loading: false,
      columns
    };
  },
  methods: {
    handleChangeTask(value) {
      console.log(`selected ${value}`);
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      this.loading = true;
      http
        .get({
          url: "https://randomuser.me/api",
          data: {
            results: 10,
            ...params
          }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
    }
  }
};
</script>

<style scoped>
.page-content {
  padding: 24px 32px;
}
</style>
