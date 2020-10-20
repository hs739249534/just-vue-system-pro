<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="消息通知"
      :breadcrumb="{ props: { routes } }"
    />
    <div class="page-content">
      <a-row type="flex">
        <a-col style="width: 45px; line-height: 32px">
          <p>
            标题：
          </p>
        </a-col>
        <a-col style="margin-right: 24px">
          <a-input
            style="width: 184px"
            v-model="seachMsg.postTitle"
          />
        </a-col>
        <!--        <a-col style="width: 70px; line-height: 32px">-->
        <!--          <p>-->
        <!--            任务类型：-->
        <!--          </p>-->
        <!--        </a-col>-->
        <!--        <a-col style="margin-right: 24px">-->
        <!--          <a-select-->
        <!--            show-search-->
        <!--            placeholder="请选择"-->
        <!--            style="width: 264px"-->
        <!--            @change="handleChangeTask"-->
        <!--          >-->
        <!--            <a-select-option value="极光推送" disabled>-->
        <!--              极光推送-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="腾讯云短信" disabled>-->
        <!--              腾讯云短信-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="微信推送" disabled>-->
        <!--              微信推送-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="邮件推送" disabled>-->
        <!--              邮件推送-->
        <!--            </a-select-option>-->
        <!--            <a-select-option value="应用内推送">-->
        <!--              应用内推送-->
        <!--            </a-select-option>-->
        <!--          </a-select>-->
        <!--        </a-col>-->
        <a-col style="width: 70px; line-height: 32px">
          <p>
            消息类型：
          </p>
        </a-col>
        <a-col style="margin-right: 24px">
          <a-select
            show-search
            placeholder="请选择"
            style="width: 184px"
            :value="seachMsg.postTypeId"
            @change="handleChangePostTypeId"
          >
            <a-select-option value="tz">
              通知公告
            </a-select-option>
            <a-select-option value="zc">
              政策法规
            </a-select-option>
            <a-select-option value="jjtz">
              紧急通知
            </a-select-option>
          </a-select>
        </a-col>
        <a-col style="width: 65px; margin: 0 4px">
          <a-button type="primary" @click="handleSeach">
            查询
          </a-button>
        </a-col>
        <a-col style="width: 65px; margin: 0 4px">
          <a-button @click="handleReset">
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
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
      >
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:" @click="onDetails(record)">详情</a>
        </template>
      </a-table>
    </div>
    <a-modal
      title="消息详情"
      width="1080px"
      :visible="detailsVisible"
      @cancel="handleCancel"
      style="top: 0;"
    >
      <template slot="footer">
        <a-button type="primary" @click="handleCancel">
          确定
        </a-button>
      </template>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="标题" v-if="msgDetails.postTitle">
          {{ msgDetails.postTitle }}
        </a-form-item>
        <a-form-item label="副标题" v-if="msgDetails.hsSecTitle">
          {{ msgDetails.hsSecTitle }}
        </a-form-item>
        <a-form-item label="任务类型" v-if="msgDetails.infoType">
          {{ msgDetails.infoType }}
        </a-form-item>
        <a-form-item label="消息类型" v-if="msgDetails.postTypeId">
          {{ msgDetails.postTypeId }}
        </a-form-item>
        <a-form-item label="操作人" v-if="msgDetails.postAuthor">
          {{ msgDetails.postAuthor }}
        </a-form-item>
        <a-form-item label="内容" v-if="msgDetails.postContent">
          <p
            style="margin: 0; border: #999999 1px solid"
            v-html="msgDetails.postContent"
          ></p>
        </a-form-item>
        <a-form-item label="目标人群" v-if="msgDetails.targetPeople">
          {{ msgDetails.targetPeople }}
        </a-form-item>
        <!--        <a-form-item label="用户信息" v-if="msgDetails.userDtos.length > 0">-->
        <!--          {{ msgDetails.userDtos }}-->
        <!--        </a-form-item>-->
        <a-form-item label="创建时间" v-if="msgDetails.createDate">
          {{ msgDetails.createDate }}
        </a-form-item>
        <a-form-item label="发送时间" v-if="msgDetails.postDate">
          {{ msgDetails.postDate }}
        </a-form-item>
        <a-form-item label="终止时间" v-if="msgDetails.stopDate">
          {{ msgDetails.stopDate }}
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import http from "../../utils/http";
import moment from "moment";
const isNull = val => {
  if (val) {
    return val;
  } else {
    return "无";
  }
};
const columns = [
  {
    title: "标题",
    dataIndex: "postTitle",
    width: "18%",
    customRender: isNull
  },
  // {
  //   title: "副标题",
  //   dataIndex: "hsSecTitle"
  // },
  {
    title: "目标人群",
    dataIndex: "targetPeople",
    width: "10%",
    customRender: isNull
  },
  {
    title: "任务类型",
    dataIndex: "infoType",
    width: "10%",
    customRender: isNull
  },
  {
    title: "消息类型",
    dataIndex: "postTypeId",
    width: "10%",
    customRender: isNull
  },
  {
    title: "操作人",
    dataIndex: "postAuthor",
    width: "8%",
    customRender: isNull
  },
  {
    title: "创建时间",
    dataIndex: "createDate",
    width: "12%",
    customRender: isNull
  },
  {
    title: "发送时间",
    dataIndex: "postDate",
    width: "12%",
    customRender: isNull
  },
  {
    title: "终止时间",
    dataIndex: "stopDate",
    width: "12%",
    customRender: isNull
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "8%",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  name: "msgMgt-msgList",
  data() {
    return {
      routes: [
        {
          path: "/msgMgt/msgList",
          breadcrumbName: "消息列表"
        }
      ],
      seachMsg: {
        postTitle: "",
        postTypeId: ""
      },
      data: [],
      msgDetails: [],
      pagination: {
        pageSize: 5
      },
      loading: false,
      detailsVisible: false,
      columns
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleReset() {
      this.seachMsg.postTitle = "";
      this.seachMsg.postTypeId = "";
      this.getData();
    },
    handleSeach() {
      this.loading = true;
      http
        .get({
          url: "/findMessage",
          params: this.seachMsg
        })
        .then(res => {
          console.log(res);
          this.data = res;
          this.data.forEach(item => {
            if (item.postDate && item.postDate.toString().length === 13) {
              item.postDate = moment(item.postDate).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
            if (item.stopDate && item.stopDate.toString().length === 13) {
              item.stopDate = moment(item.stopDate).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
          });
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    onDetails(record) {
      this.detailsVisible = true;
      this.msgDetails = record;
      console.log("record", record);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.detailsVisible = false;
    },
    handleChangeTask(value) {
      console.log(`selected ${value}`);
    },
    handleChangePostTypeId(value) {
      this.seachMsg.postTypeId = value;
    },
    getData() {
      this.loading = true;
      http
        .get({
          url: "/findAllMessage"
        })
        .then(res => {
          this.data = res;
          this.data.forEach(item => {
            if (item.postDate && item.postDate.toString().length === 13) {
              item.postDate = moment(item.postDate).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
            if (item.stopDate && item.stopDate.toString().length === 13) {
              item.stopDate = moment(item.stopDate).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
          });
          console.log(this.data);
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style scoped>
.page-content {
  padding: 24px 32px;
}
.ant-row {
  margin-bottom: 0;
}
</style>
