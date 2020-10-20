<template>
  <div>
    <div style="height: 112px">
      <a-row type="flex" justify="center">
        <a-col>
          <p style="line-height: 32px">发送对象：</p>
        </a-col>
        <a-col>
          <a-radio-group v-model="usersShow">
            <a-radio-button :value="false">
              全部用户
            </a-radio-button>
            <a-radio-button :value="true" disabled>
              部分用户
            </a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" v-if="usersShow">
        <a-col>
          <p style="line-height: 32px">选择用户：</p>
        </a-col>
        <a-col>
          <a-textarea
            style="width: 175px; background-color: #ffffff"
            :value="userString"
            :auto-size="{ minRows: 1, maxRows: 3 }"
            placeholder="请选择"
            readonly="readonly"
            @click="usersSelect"
          />
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="选择用户"
      :visible="usersSelectShow"
      @cancel="handleCancel"
      style="top: 0;"
      width="800px"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleOk">
          完成
        </a-button>
      </template>
      <!--  <div>
        <a-form
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
          style="width: 43%; margin-bottom: 12px"
        >
          <a-form-item label="姓名">
            <a-input placeholder="请输入" v-model="seachUsersInfo.name" />
          </a-form-item>
          <a-form-item label="身份证号">
            <a-input placeholder="请输入" v-model="seachUsersInfo.Idcard" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 7 }">
            <a-button
              type="primary"
              html-type="submit"
              style="margin-right: 10px"
              @click="seachUsers"
            >
              查询
            </a-button>
            <a-button
              @click="
                () => {
                  seachUsersInfo.name = '';
                  seachUsersInfo.Idcard = '';
                  mockData = [];
                  targetKeys = [];
                }
              "
            >
              重置
            </a-button>
          </a-form-item>
        </a-form>
        <a-transfer
          :titles="['用户列表', '已选择用户列表']"
          :operations="['加入右侧', '加入左侧']"
          :data-source="mockData"
          :target-keys="targetKeys"
          :show-select-all="false"
          @change="onChange"
        >
          <template
            slot="children"
            slot-scope="{
              props: {
                direction,
                filteredItems,
                selectedKeys,
                disabled: listDisabled
              },
              on: { itemSelectAll, itemSelect }
            }"
          >
            <a-table
              :row-selection="
                getRowSelection({
                  selectedKeys,
                  itemSelectAll,
                  itemSelect
                })
              "
              :columns="direction === 'left' ? leftColumns : rightColumns"
              :data-source="filteredItems"
              size="small"
              :style="{ pointerEvents: listDisabled ? 'none' : null }"
              :custom-row="
                ({ key, disabled: itemDisabled }) => ({
                  on: {
                    click: () => {
                      if (itemDisabled || listDisabled) return;
                      itemSelect(key, !selectedKeys.includes(key));
                    }
                  }
                })
              "
            />
          </template>
        </a-transfer>
      </div>  -->
      <a-row>
        <a-col :span="11">
          <a-card title="用户列表" style="width: 100%" size="small">
            <a slot="extra" href="#">more</a>
            <a-form
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
              style="width: 100%"
            >
              <a-form-item label="姓名">
                <a-input placeholder="请输入" v-model="seachUsersInfo.name" />
              </a-form-item>
              <a-form-item label="身份证号">
                <a-input placeholder="请输入" v-model="seachUsersInfo.Idcard" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 16, offset: 7 }">
                <a-button
                  type="primary"
                  html-type="submit"
                  style="margin-right: 10px"
                  @click="seachUsers"
                >
                  查询
                </a-button>
                <a-button
                  @click="
                    () => {
                      seachUsersInfo.name = '';
                      seachUsersInfo.Idcard = '';
                      mockData = [];
                      targetKeys = [];
                      selectedLeftRows = [];
                      selectedRightRows = [];
                    }
                  "
                >
                  重置
                </a-button>
              </a-form-item>
            </a-form>
            <a-table
              :row-selection="{
                onSelect: onSelectLeftRows,
                onSelectAll: onSelectLeftAllRows
              }"
              :pagination="{ pageSize: 7 }"
              :columns="leftColumns"
              :data-source="mockData"
              :loading="tableLoading"
              :rowKey="record => record.idcard"
              size="small"
            />
          </a-card>
        </a-col>
        <a-col :span="2" style="margin-top: 200px">
          <a-row type="flex" justify="center"
            ><a-button
              type="primary"
              icon="caret-right"
              @click="toRight"
              :disabled="toRightDisabled"
          /></a-row>
          <a-row style="height: 8px"></a-row>
          <a-row type="flex" justify="center"
            ><a-button
              type="primary"
              icon="caret-left"
              @click="toLeft"
              :disabled="toLeftDisabled"
          /></a-row>
        </a-col>
        <a-col :span="11">
          <a-card title="已选择用户列表" style="width: 100%" size="small">
            <a-table
              :row-selection="{
                onSelect: onSelectRightRows,
                onSelectAll: onSelectRightAllRows
              }"
              :pagination="{ pageSize: 10 }"
              :columns="rightColumns"
              :rowKey="record => record.idcard"
              :data-source="targetKeys"
              size="small"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import http from "../../../utils/http";
import difference from "lodash/difference";

const originTargetKeys = [];

const leftTableColumns = [
  {
    dataIndex: "name",
    title: "姓名"
  },
  {
    dataIndex: "idcard",
    title: "身份证号"
  }
];
const rightTableColumns = [
  {
    dataIndex: "name",
    title: "姓名"
  },
  {
    dataIndex: "idcard",
    title: "身份证号"
  }
];
export default {
  name: "NewMsg1",
  data() {
    return {
      tableLoading: false,
      seachUsersInfo: {
        name: "",
        Idcard: ""
      },
      userString: "",
      mockData: [],
      targetKeys: originTargetKeys,
      leftColumns: leftTableColumns,
      rightColumns: rightTableColumns,
      adminInfoDto: {
        hsSecTitle: "",
        infoType: "",
        postAuthor: "",
        postContent: "",
        postDate: "",
        postTitle: "",
        postTypeId: "",
        targetPeople: "",
        userDtos: []
      },
      usersShow: false,
      usersSelectShow: false,
      toLeftDisabled: true,
      toRightDisabled: true,
      selectedLeftRows: [], // Check here to configure the default column
      selectedRightRows: [] // Check here to configure the default column
    };
  },
  watch: {
    usersShow: {
      // 数据发生变化就会调用这个函数
      handler(newVal, oldVal) {
        console.log("oldVal:", oldVal);
        console.log("newVal:", newVal);
        if (newVal === false) {
          this.adminInfoDto.targetPeople = "全部用户";
          localStorage.setItem("targetPeople", this.adminInfoDto.targetPeople);
        } else {
          this.adminInfoDto.targetPeople = "部分用户";
          localStorage.setItem("targetPeople", this.adminInfoDto.targetPeople);
        }
      },
      // 立即处理 进入页面就触发
      immediate: true
    },
    selectedLeftRows(value) {
      console.log(value.length);
      if (value.length > 0) {
        this.toRightDisabled = false;
      } else {
        this.toRightDisabled = true;
      }
    },
    selectedRightRows(value) {
      this.toLeftDisabled = value.length <= 0;
    }
  },
  methods: {
    onSelectLeftRows(record, selected, selectedRows, nativeEvent) {
      console.log("selectedRows", selectedRows);
      this.selectedLeftRows = selectedRows;
    },
    onSelectRightRows(record, selected, selectedRows, nativeEvent) {
      console.log("selectedRows", selectedRows);
      this.selectedRightRows = selectedRows;
    },
    onSelectLeftAllRows(selected, selectedRows, changeRows) {
      console.log("selectedRows", selectedRows);
      this.selectedLeftRows = selectedRows;
    },
    onSelectRightAllRows(selected, selectedRows, changeRows) {
      console.log("selectedRows", selectedRows);
      this.selectedRightRows = selectedRows;
    },
    toRight() {
      // console.log("this.selectedLeftRows", this.selectedLeftRows);
      this.mockData = this.mockData.filter(item => {
        return this.selectedLeftRows.indexOf(item) === -1;
      });
      this.targetKeys = this.targetKeys.concat(this.selectedLeftRows);
      // console.log("this.mockData", this.mockData);
      // console.log("this.targetKeys", this.targetKeys);
      this.selectedLeftRows = [];
    },
    toLeft() {
      this.targetKeys = this.targetKeys.filter(item => {
        return this.selectedRightRows.indexOf(item) === -1;
      });
      this.mockData = this.mockData.concat(this.selectedRightRows);
      this.selectedRightRows = [];
    },
    seachUsers() {
      // 查询客户
      this.tableLoading = true;
      let params = this.seachUsersInfo;
      http
        .get({
          url: "/findUserByNameAndIdCard",
          params: params
        })
        .then(res => {
          // res.forEach((item, index) => {
          // item["key"] = index.toString();
          // item["title"] = index.toString();
          // });
          this.mockData = [];
          // console.log("findUser", res);
          // console.log("this.targetKeys", this.targetKeys);
          if (this.targetKeys.length === 0) {
            this.mockData = res;
          } else {
            res.forEach(item => {
              let repeat = false;
              this.targetKeys.forEach(item2 => {
                if (item.idcard === item2.idcard) {
                  // console.log("item.idcard !== item2.idcard", item2.idcard);
                  repeat = true;
                }
              });
              if (!repeat) {
                this.mockData.push(item);
              }
              // console.log("pushItem", item);
            });
          }
          this.tableLoading = false;
          // console.log("mockData", this.mockData);
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    usersSelect() {
      this.usersSelectShow = true;
      console.log("usersSelectShow", this.usersSelectShow);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.usersSelectShow = false;
    },
    handleOk() {
      this.userString = "";
      console.log(this.targetKeys);
      this.adminInfoDto.userDtos = this.targetKeys;
      for (let i = 0; i < this.adminInfoDto.userDtos.length; i++) {
        this.userString += this.adminInfoDto.userDtos[i].name + " ";
      }
      console.log(this.userDtos);
      this.usersSelectShow = false;
    }
    // onChange(nextTargetKeys) {
    //   this.targetKeys = nextTargetKeys;
    // },
    /*  getRowSelection({ selectedKeys, itemSelectAll, itemSelect }) {
      return {
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys
      };
    } */
  }
};
</script>

<style scoped>
.ant-row {
  margin-bottom: 0;
}
</style>
