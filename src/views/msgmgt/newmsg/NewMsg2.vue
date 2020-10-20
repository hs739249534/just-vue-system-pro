<template>
  <div>
    <a-form
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-form-item label="任务类型">
        <a-select show-search placeholder="请选择" @change="handleChangeTask">
          <a-select-option value="极光推送" disabled>
            极光推送
          </a-select-option>
          <a-select-option value="腾讯云短信" disabled>
            腾讯云短信
          </a-select-option>
          <a-select-option value="微信推送" disabled>
            微信推送
          </a-select-option>
          <a-select-option value="邮件推送" disabled>
            邮件推送
          </a-select-option>
          <a-select-option value="应用内推送">
            应用内推送
          </a-select-option>
        </a-select>
      </a-form-item>
      <!--      <div style="height: 240px;">-->
      <a-form-item
        label="邮箱地址"
        v-if="adminInfoDto.infoType === '邮件推送'"
      >
        <a-input placeholder="请输入邮箱地址" />
      </a-form-item>
      <a-form-item
        label="消息类型"
        v-if="adminInfoDto.infoType === '应用内推送'"
      >
        <a-select placeholder="请选择" @change="handleChangePostTypeId">
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
      </a-form-item>
      <a-form-item
        label="标题"
        v-if="
          adminInfoDto.infoType === '极光推送' ||
            adminInfoDto.infoType === '邮件推送' ||
            adminInfoDto.infoType === '应用内推送'
        "
      >
        <a-input placeholder="请输入标题" v-model="adminInfoDto.postTitle" />
      </a-form-item>
      <a-form-item
        label="副标题"
        v-if="
          adminInfoDto.infoType === '极光推送' ||
            adminInfoDto.infoType === '邮件推送' ||
            adminInfoDto.infoType === '应用内推送'
        "
      >
        <a-input placeholder="请输入标题" v-model="adminInfoDto.hsSecTitle" />
      </a-form-item>
      <a-form-item
        label="内容"
        v-show="
          adminInfoDto.infoType === '极光推送' ||
            adminInfoDto.infoType === '邮件推送' ||
            adminInfoDto.infoType === '应用内推送'
        "
      >
        <!--        <a-textarea-->
        <!--          :auto-size="{ minRows: 3, maxRows: 5 }"-->
        <!--          placeholder="请输入内容"-->
        <!--          @click="showEditor"-->
        <!--        />-->
        <div id="demo1"></div>
      </a-form-item>
      <a-form-item
        label="选择模板"
        v-if="
          adminInfoDto.infoType === '腾讯云短信' ||
            adminInfoDto.infoType === '微信推送'
        "
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
      <a-form-item label="推送时间" v-if="isTiming">
        <a-date-picker
          :disabled-date="disabledDate"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          @change="onChangePostDate"
        />
      </a-form-item>
      <a-form-item label="终止时间" v-if="adminInfoDto.postTypeId === 'jjtz'">
        <a-date-picker
          :disabled-date="disabledDate"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          @change="onChangeStopDate"
        />
      </a-form-item>
    </a-form>
    <!--    <a-modal :visible="editorShow" @cancel="handleCancel">-->
    <!--      <div id="demo1"></div>-->
    <!--    </a-modal>-->
  </div>
</template>

<script>
import moment from "moment";
import wangEditor from "wangeditor";

export default {
  name: "NewMsg2",
  data() {
    return {
      editor: null,
      // editorData: "",
      editorShow: false,

      isTiming: false,
      adminInfoDto: {
        hsSecTitle: "",
        infoType: "",
        postAuthor: "",
        postContent: "",
        postDate: "",
        stopDate: "",
        postTitle: "",
        postTypeId: "",
        targetPeople: localStorage.getItem("targetPeople"),
        userDtos: []
      }
    };
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      // this.editorData = newHtml;
      this.adminInfoDto.postContent = newHtml;
    };
    editor.config.showFullScreen = true; // 全屏键
    // 默认情况下，显示所有菜单
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      // "backColor", // 背景颜色
      // "link", // 链接
      "list",
      "justify",
      // "quote",
      // "emoticon", // 表情
      // "image",
      // "video",
      // "table",
      // "code",
      "splitLine",
      "undo",
      "redo"
    ];
    editor.config.zIndex = 500;
    editor.config.height = 100;
    // 创建编辑器
    editor.create();

    this.editor = editor;
  },
  methods: {
    onChangePostDate(date, dateString) {
      console.log(date.valueOf(), dateString);
      this.adminInfoDto.postDate = dateString;
    },
    onChangeStopDate(date, dateString) {
      console.log(date, dateString);
      this.adminInfoDto.stopDate = dateString;
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.editorShow = false;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().startOf("day");
    },
    handleChangeTask(value) {
      // 获取任务类型
      this.adminInfoDto.infoType = value;
      console.log(this.adminInfoDto.infoType, this.adminInfoDto.postTypeId);
    },
    handleChangePostTypeId(value) {
      this.adminInfoDto.postTypeId = value;
    },
    getAdminInfoDto() {
      return this.adminInfoDto;
    },
    getTimingState() {
      return this.isTiming;
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>
