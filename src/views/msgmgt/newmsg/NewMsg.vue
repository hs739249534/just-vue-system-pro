<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新建消息"
      :breadcrumb="{ props: { routes } }"
    />
    <div style="padding: 40px 32px">
      <a-steps :current="current" style="padding: 0 72px">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="steps-content">
      <keep-alive>
        <new-msg1 v-if="steps[current].content === 'NewMsg1'"></new-msg1>
        <new-msg2
          v-if="steps[current].content === 'NewMsg2'"
          ref="new-msg2"
        ></new-msg2>
        <new-msg3
          v-if="steps[current].content === 'NewMsg3'"
          :adminInfoDto="adminInfoDto"
        ></new-msg3>
      </keep-alive>
    </div>
    <div
      class="steps-action"
      style="justify-content: center; display: flex; margin: 24px 0"
    >
      <a-button v-if="current === 0" type="primary" @click="next">
        下一步
      </a-button>
      <a-button v-if="current === 1" type="primary" @click="submit">
        提交
      </a-button>
      <a-button v-if="current === 1" style="margin-left: 8px" @click="prev">
        上一步
      </a-button>
      <a-button v-if="current === 2" type="primary" @click="current = 0">
        继续发送
      </a-button>
      <a-button v-if="current === 2" style="margin-left: 8px">
        <router-link to="/msgMgt/msgList">返回</router-link>
      </a-button>
    </div>
    <!--    <div style="margin-top: 40px">-->
    <!--      <hr-->
    <!--        style="background-color: #ebedf0; border: none; height: 1px; margin: 8px 0"-->
    <!--      />-->
    <!--      <div style="color: rgba(0,0,0,0.4470588235294118); padding: 24px 48px">-->
    <!--        <p style="font-weight: bold; margin: 0">说明</p>-->
    <!--        <br />-->
    <!--        <p style="font-weight: bold; margin: 0">全部用户</p>-->
    <!--        <p style="margin: 0">-->
    <!--          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <p style="font-weight: bold; margin: 0">部分用户</p>-->
    <!--        <p style="margin: 0">-->
    <!--          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。-->
    <!--        </p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import http from "../../../utils/http";
import NewMsg1 from "./NewMsg1";
import NewMsg2 from "./NewMsg2";
import NewMsg3 from "./NewMsg3";
export default {
  name: "msgMgt-newMsg",
  components: { NewMsg1, NewMsg2, NewMsg3 },
  data() {
    return {
      routes: [
        {
          path: "/msgMgt/msgList",
          breadcrumbName: "消息列表"
        },
        {
          path: "/msgMgt/newMsg",
          breadcrumbName: "新建消息"
        }
      ],
      usersShow: false,
      adminInfoDto: [],
      isTiming: false,
      current: 0,
      steps: [
        {
          title: "选择发送用户",
          content: "NewMsg1"
        },
        {
          title: "编辑消息内容",
          content: "NewMsg2"
        },
        {
          title: "完成",
          content: "NewMsg3"
        }
      ]
    };
  },
  methods: {
    next() {
      this.current = 1;
    },
    submit() {
      this.adminInfoDto = this.$refs["new-msg2"].getAdminInfoDto();
      this.isTiming = this.$refs["new-msg2"].getTimingState();
      console.log(this.adminInfoDto);
      if (!this.adminInfoDto.infoType) {
        this.$message.warning("请选择任务类型");
        return;
      } else {
        if (!this.adminInfoDto.postTypeId) {
          this.$message.warning("请选择消息类型");
          return;
        } else {
          if (
            this.adminInfoDto.postTypeId === "jjtz" &&
            !this.adminInfoDto.stopDate
          ) {
            this.$message.warning("请输入终止时间");
            return;
          }
        }
        if (!this.adminInfoDto.postTitle) {
          this.$message.warning("请输入标题");
          return;
        }
      }
      if (this.isTiming && !this.adminInfoDto.postDate) {
        this.$message.warning("请输入推送时间");
        return;
      }
      http
        .post({
          url: "/saveMessage",
          data: this.adminInfoDto
        })
        .then(res => {
          console.log("res", res);
          this.current = 2;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    prev() {
      this.current--;
    }
  }
};
</script>

<style scoped></style>
