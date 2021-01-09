<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="人员列表"
    />
    <div class="page-content">
      <div class="table-operations">
        <a-button @click="registerVisible = true" type="primary">
          新增
        </a-button>
        <!--        <a-button @click="registerVisible = true">-->
        <!--          批量导入-->
        <!--        </a-button>-->
        <input
          type="file"
          id="file"
          style="display: none"
          @change="handleFileChange"
          ref="inputer"
        />
        <a-dropdown-button @click="handleButtonClick">
          批量导入
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">下载模板</a-menu-item>
          </a-menu>
          <a-icon slot="icon" type="down" />
        </a-dropdown-button>
      </div>
      <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
      >
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:" @click="onDetails(record)">修改 </a>
          <span>|</span>
          <a-popconfirm
            v-if="data.length"
            title="确定删除该员工的信息吗"
            @confirm="() => deleteStaff(record)"
          >
            <a href="javascript:"> 删除</a>
          </a-popconfirm>
        </template>
        <div
          slot="filterDropdown"
          slot-scope="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column
          }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`搜索 ${column.title}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="
              e => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="
              () => handleSearch(selectedKeys, confirm, column.dataIndex)
            "
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            搜索
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="() => handleReset(clearFilters)"
          >
            重置
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
          <span v-if="searchText && searchedColumn === column.dataIndex">
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
                >{{ fragment }}</mark
              >
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>
            {{ text }}
          </template>
        </template>
      </a-table>
    </div>
    <a-modal
      title="信息修改"
      :visible="detailsVisible"
      @ok="handleOk(details)"
      @cancel="handleCancel"
    >
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
        <a-form-item label="姓名">
          <a-input v-model="details.name" />
        </a-form-item>
        <a-form-item label="账号">
          <a-input v-model="details.username" disabled />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="details.email" disabled />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model="details.password" />
        </a-form-item>
        <a-form-item label="手机">
          <a-input v-model="details.phoneNum" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="添加员工"
      :visible="registerVisible"
      :footer="null"
      @cancel="handleCancel"
    >
      <register-staff @child-event="getRegisterVisible"></register-staff>
    </a-modal>
  </div>
</template>

<script>
import http from "../../utils/http";
import RegisterStaff from "../../components/registerStaff";

const isNull = val => {
  if (val) {
    return val;
  } else {
    return "无";
  }
};
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }
        },
        {
          title: "账号",
          dataIndex: "username",
          customRender: isNull
        },
        {
          title: "邮箱",
          dataIndex: "email",
          customRender: isNull
        },
        {
          title: "手机",
          dataIndex: "phoneNum",
          customRender: isNull
        },
        // {
        //   title: "创建时间",
        //   dataIndex: "createDate",
        //   customRender: isNull
        // },
        // {
        //   title: "操作时间",
        //   dataIndex: "operateDate",
        //   customRender: isNull
        // },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      data: [],
      pagination: {
        pageSize: 10
      },
      loading: false,
      detailsVisible: false,
      registerVisible: false,
      details: {}
    };
  },
  components: {
    RegisterStaff
  },
  mounted() {
    this.getAllInfo();
  },
  methods: {
    handleButtonClick(e) {
      console.log("click left button", e);
      document.getElementById("file").click();
      // var file = document.querySelector("#file").files[0];
      // //创建formdata对象
      // var formdata = new FormData();
      // formdata.append("file",file);
      // console.log("formdata", formdata)
    },
    handleFileChange() {
      let inputDOM = this.$refs.inputer;
      let file = inputDOM.files[0]; //通过DOM取文件数据
      console.log("file", file);
      // eslint-disable-next-line no-unused-vars
      let size = Math.floor(file.size / 1024); //计算文件的大小
      console.log("size", size);
      let formData = new FormData(); //new一个formData事件
      formData.append("file", file); //将file属性添加到formData里
      console.log("formData", formData);
      http
        .upload({
          method: "POST",
          url: "/api/user/addManyUserInfo",
          data: formData
        })
        .then(res => {
          console.log("res", res);
          this.getAllInfo();
          this.$success({
            title: "成功！",
            content: "导入成功"
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    handleMenuClick(e) {
      console.log("click", e);
    },
    getRegisterVisible(data) {
      this.registerVisible = data;
      this.getAllInfo();
    },
    getAllInfo() {
      function handleStaff(staff) {
        return (
          staff.enabled === true &&
          staff.authorities[0].authority === "ROLE_user"
        );
      }
      http
        .get({
          url: "/api/user/getAllInfo"
        })
        .then(res => {
          console.log("员工信息", res);
          this.data = res.filter(handleStaff);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleOk(details) {
      this.changeInfo(details);
      this.detailsVisible = false;
    },
    handleCancel() {
      this.detailsVisible = false;
      this.registerVisible = false;
    },
    onDetails(record) {
      this.detailsVisible = true;
      this.details = record;
      console.log("record", record);
    },
    deleteStaff(record) {
      http
        .delete({
          url: "/api/user/deleteStaff",
          params: {
            id: record.id
          }
        })
        .then(res => {
          console.log(res);
          this.getAllInfo();
          this.$success({
            title: "成功！",
            content: "删除成功"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeInfo(details) {
      http
        .put({
          url: "/api/user/changeUserInfo",
          data: details
        })
        .then(res => {
          console.log(res);
          this.$success({
            title: "成功！",
            content: "修改成功"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    }
  }
};
</script>

<style scoped>
.page-content {
  padding: 24px 32px;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
