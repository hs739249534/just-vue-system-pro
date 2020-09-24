<template>
  <a-card :bordered="false">
    <div class="table-page">
      <a-row :gutter="16">
        <a-col :span="6">
          <div class="tree-limited">
            <a-tree
              showIcon
              defaultExpandAll
              @select="onSelectTree"
              :treeData="topFuncs"
              :selectedKeys="topfuncsKeys"
            >
              <span slot="groupTitle" style="color: #1890ff">添加组</span>
              <span slot="itemTitle" style="color: #1890ff">添加功能</span>
              <a-icon type="folder" slot="groupIcon" />
              <a-icon type="folder-add" slot="addGroupIcon" />
              <a-icon type="file" slot="itemIcon" />
              <a-icon type="file-add" slot="addItemIcon" />
            </a-tree>
          </div>
        </a-col>
        <a-col :span="14">
          <br />

          <a-form
            :form="groupForm"
            @submit="updateGroup"
            layout="vertical"
            v-if="groupFormVisible"
          >
            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="父组编码">
                  <a-input
                    v-decorator="[
                      'fatherId',
                      {
                        rules: [
                          // todo
                          // {
                          //   required: true,
                          //   message: '请输入父组编码'
                          // }
                        ]
                      }
                    ]"
                    disabled
                    placeholder="请输入父组编码"
                  />
                </a-form-item>
                <a-form-item label="组编码">
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
                    :disabled="isUpdate"
                    placeholder="请输入组编码"
                  />
                </a-form-item>
                <a-form-item label="组名称">
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
                    @change="handleGroupNameChange"
                    placeholder="请输入组名称"
                  />
                </a-form-item>
                <a-form-item label="组图标标志">
                  <a-switch
                    v-decorator="[
                      'iconFlag',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  v-if="!groupForm.getFieldValue('iconFlag')"
                  label="组图标链接"
                >
                  <a-input
                    v-decorator="[
                      'groupicon',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入组图标链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="groupForm.getFieldValue('iconFlag')"
                  label="组图标根链接"
                >
                  <a-input
                    v-decorator="[
                      'baseUrl',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入组图标根链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="groupForm.getFieldValue('iconFlag')"
                  label="组图标中间链接"
                >
                  <a-input
                    v-decorator="[
                      'midUrl',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入组图标中间链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="groupForm.getFieldValue('iconFlag')"
                  label="组图标文件"
                >
                  <a-upload
                    v-decorator="[
                      'iconFile',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: returnFile
                      }
                    ]"
                    :beforeUpload="handleFile"
                    list-type="picture"
                  >
                    <a-button>
                      <a-icon type="upload" />
                      选择文件
                    </a-button>
                  </a-upload>
                </a-form-item>
                <a-form-item label="排序依据">
                  <a-input
                    v-decorator="[
                      'orderid',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: '请输入排序依据'
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入排序依据"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="客户端类型">
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
                <a-form-item label="组描述">
                  <a-input
                    v-decorator="[
                      'groupdesc',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: '请输入组描述'
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入组描述"
                  />
                </a-form-item>
                <a-form-item label="停用标识">
                  <a-switch
                    v-decorator="[
                      'closed',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit">
                    <span v-if="isUpdate">更新</span>
                    <span v-else>新建</span>
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>

          <a-form
            :form="itemForm"
            @submit="updateItem"
            layout="vertical"
            v-if="itemFormVisible"
          >
            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="组编码">
                  <a-input
                    v-decorator="[
                      'groupid',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: '请输入组编码'
                          // }
                        ]
                      }
                    ]"
                    disabled
                    placeholder="请输入组编码"
                  />
                </a-form-item>
                <a-form-item label="功能编码">
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
                    :disabled="isUpdate"
                    placeholder="请输入功能编码"
                  />
                </a-form-item>
                <a-form-item label="功能名称">
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
                    @change="handleNameChange"
                    placeholder="请输入功能名称"
                  />
                </a-form-item>
                <a-form-item label="功能图标标志">
                  <a-switch
                    v-decorator="[
                      'iconFlag',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  v-if="!itemForm.getFieldValue('iconFlag')"
                  label="功能图标链接"
                >
                  <a-input
                    v-decorator="[
                      'icon',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入功能图标链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="itemForm.getFieldValue('iconFlag')"
                  label="功能图标根链接"
                >
                  <a-input
                    v-decorator="[
                      'baseUrl',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入功能图标根链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="itemForm.getFieldValue('iconFlag')"
                  label="功能图标中间链接"
                >
                  <a-input
                    v-decorator="[
                      'midUrl',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入功能图标中间链接"
                  />
                </a-form-item>
                <a-form-item
                  v-if="itemForm.getFieldValue('iconFlag')"
                  label="功能图标文件"
                >
                  <a-upload
                    v-decorator="[
                      'iconFile',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: returnFile
                      }
                    ]"
                    :beforeUpload="handleFile"
                    list-type="picture"
                  >
                    <a-button>
                      <a-icon type="upload" />
                      选择文件
                    </a-button>
                  </a-upload>
                </a-form-item>
                <a-form-item label="排序依据">
                  <a-input
                    v-decorator="[
                      'orderid',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: '请输入排序依据'
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入排序依据"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="客户端类型">
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
                <a-form-item label="首页排序依据">
                  <a-input
                    v-decorator="[
                      'topid',
                      {
                        rules: [
                          {
                            // required: true,
                            // message: '请输入首页排序依据'
                          }
                        ]
                      }
                    ]"
                    placeholder="请输入首页排序依据"
                  />
                </a-form-item>
                <a-form-item label="Web链接">
                  <a-input
                    v-decorator="[
                      'url',
                      {
                        rules: [
                          // {
                          //   required: true,
                          //   message: '请输入功能链接'
                          // }
                        ]
                      }
                    ]"
                    placeholder="请输入功能链接"
                  />
                </a-form-item>
                <a-form-item label="停用标识">
                  <a-switch
                    v-decorator="[
                      'closed',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item label="匿名标识">
                  <a-switch
                    v-decorator="[
                      'anonymous',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item label="热点标识">
                  <a-switch
                    v-decorator="[
                      'ishot',
                      {
                        valuePropName: 'checked',
                        rules: [
                          // {
                          //   required: true,
                          //   message: ''
                          // }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit">
                    <span v-if="isUpdate">更新</span>
                    <span v-else>新建</span>
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import moment from "moment";
import http from "../../utils/http";
import pinyin from "pinyin";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      // topFuncs: [],
      topFuncs: [
        {
          title: "group####0",
          key: "group####0",
          children: [
            {
              title: "group####0####0",
              key: "group####0####0"
            },
            {
              title: "0####0####1",
              key: "0####0####1"
            },
            {
              title: "0####0####2",
              key: "0####0####2"
            }
          ]
        },
        {
          title: "item####1",
          key: "item####1"
        },
        {
          title: "create-group####2",
          key: "create-group####2"
        }
      ],
      topfuncsKeys: [],
      groupForm: this.$form.createForm(this, { name: "groupForm" }),
      groupFormVisible: false,
      itemForm: this.$form.createForm(this, { name: "itemForm" }),
      itemFormVisible: false,
      isUpdate: false
    };
  },
  created() {
    // this.getTopFuncs();
  },
  methods: {
    moment,
    getTopFuncs() {
      http
        .get({
          url: "sys/function/anonymous/v4/functions/top"
        })
        .then(ret => {
          this.log("getTopFuncs", ret);
          this.topFuncs = this.handleTreeData(ret);
          this.topFuncs.push({
            key: `create-root####`,
            slots: {
              title: "groupTitle",
              icon: "addGroupIcon"
            }
          });
        })
        .catch(err => {
          this.log("getTopFuncs", err);
        });
    },
    handleTreeData(funcs) {
      let _funcs = [];
      funcs.map(func => {
        let _func = {};
        _func.title = `${func.groupname}  [ ${func.count1}/${func.count2} ]`;
        _func.key = `group####${func.groupid}`;
        _func.slots = {
          icon: "groupIcon"
        };
        _func.children = [];
        if (func.functionDTOS && func.functionDTOS.length > 0) {
          func.functionDTOS.map(item => {
            _func.children.push({
              title: item.name,
              key: `item####${item.id}`,
              slots: {
                icon: "itemIcon"
              }
            });
          });
        }
        if (func.functionGroupDTOS && func.functionGroupDTOS.length > 0) {
          _func.children = _func.children.concat(
            this.handleTreeData(func.functionGroupDTOS)
          );
        }
        _func.children.push({
          key: `create-group####${func.groupid}`,
          slots: {
            title: "groupTitle",
            icon: "addGroupIcon"
          }
        });
        _func.children.push({
          key: `create-item####${func.groupid}`,
          slots: {
            title: "itemTitle",
            icon: "addItemIcon"
          }
        });
        _funcs.push(_func);
      });
      return _funcs;
    },
    onSelectTree(keys) {
      this.log("onSelectTree", keys);
      this.groupFormVisible = false;
      this.itemFormVisible = false;
      this.topfuncsKeys = keys;
      if (keys.length > 0) {
        const key = keys[0];
        const type = key.split("####")[0];
        this.log("type", type);
        const id = key.split("####")[1];
        this.log("id", id);
        if (type === "group") {
          this.isUpdate = true;
          this.getGroup(id);
        } else if (type === "item") {
          this.isUpdate = true;
          this.getItem(id);
        } else if (type === "create-group") {
          this.isUpdate = false;
          this.createGroup(id);
        } else if (type === "create-item") {
          this.isUpdate = false;
          this.createItem(id);
        } else if (type === "create-root") {
          this.isUpdate = false;
          this.createGroup("");
        }
      }
    },
    getGroup(id) {
      http
        .get({
          url: "sys/function/no1/v2/group/info",
          params: {
            groupId: id
          }
        })
        .then(ret => {
          this.log("getGroup", ret);
          this.groupFormVisible = true;
          this.$nextTick(() => {
            this.groupForm.setFieldsValue({
              groupid: ret.groupid,
              groupname: ret.groupname,
              groupdesc: ret.groupdesc,
              groupicon: ret.groupicon,
              orderid: ret.orderid,
              fatherId: ret.fatherId,
              closed: ret.closed === "1",
              clients: ret.clients
            });
          });
        })
        .catch(err => {
          this.log("getGroup", err);
        });
    },
    getItem(id) {
      http
        .get({
          url: "sys/function/no3/v2/item/info",
          params: {
            itemId: id
          }
        })
        .then(ret => {
          this.log("getItem", ret);
          this.itemFormVisible = true;
          this.$nextTick(() => {
            this.itemForm.setFieldsValue({
              anonymous: ret.anonymous === "1" ? true : false,
              clients: ret.clients,
              closed: ret.closed === "1" ? true : false,
              groupid: ret.groupid,
              id: ret.id,
              ishot: ret.ishot === "1" ? true : false,
              name: ret.name,
              orderid: ret.orderid,
              topid: ret.topid,
              icon: ret.icon,
              url: ret.url
            });
          });
        })
        .catch(err => {
          this.log("getItem", err);
        });
    },
    updateGroup(e) {
      e.preventDefault();
      this.groupForm.validateFields((err, values) => {
        if (!err) {
          this.log("updateGroup values", values);
          let iconFile = undefined;
          if (
            values.iconFile &&
            values.iconFile.length > 0 &&
            values.iconFile[0].thumbUrl
          ) {
            let b64 = values.iconFile[0].thumbUrl;
            iconFile = b64.split(",")[1];
          }
          http
            .put({
              url: "sys/function/no2/v2/group/info",
              data: {
                groupid: values.groupid,
                groupname: values.groupname,
                groupdesc: values.groupdesc,
                groupicon: values.groupicon,
                orderid: values.orderid,
                fatherId: values.fatherId,
                closed: values.closed ? "1" : "0",
                clients: values.clients,
                iconFlag: values.iconFlag ? "1" : "0",
                baseUrl: values.baseUrl,
                midUrl: values.midUrl,
                iconFile
              }
            })
            .then(ret => {
              this.log("updateGroup", ret);
              this.$message.success("新建/更新成功");
              this.getTopFuncs();
            })
            .catch(err => {
              this.log("updateGroup", err);
              this.$message.error("新建/更新失败");
            });
        }
      });
    },
    updateItem(e) {
      e.preventDefault();
      this.itemForm.validateFields((err, values) => {
        if (!err) {
          this.log("updateItem values", values);
          let iconFile = undefined;
          if (
            values.iconFile &&
            values.iconFile.length > 0 &&
            values.iconFile[0].thumbUrl
          ) {
            let b64 = values.iconFile[0].thumbUrl;
            iconFile = b64.split(",")[1];
          }
          http
            .put({
              url: "sys/function/no4/v2/item/info",
              data: {
                anonymous: values.anonymous ? "1" : "0",
                clients: values.clients,
                closed: values.closed ? "1" : "0",
                groupid: values.groupid,
                id: values.id,
                ishot: values.ishot ? "1" : "0",
                name: values.name,
                orderid: values.orderid,
                topid: values.topid,
                icon: values.icon,
                url: values.url,
                iconFlag: values.iconFlag ? "1" : "0",
                baseUrl: values.baseUrl,
                midUrl: values.midUrl,
                iconFile
              }
            })
            .then(ret => {
              this.log("updateGroup", ret);
              this.$message.success("新建/更新成功");
              this.getTopFuncs();
            })
            .catch(err => {
              this.log("updateGroup", err);
              this.$message.error("新建/更新失败");
            });
        }
      });
    },
    createGroup(id) {
      this.log("createGroup", id);
      this.groupFormVisible = true;
      this.$nextTick(() => {
        this.groupForm.resetFields();
        this.groupForm.setFieldsValue({
          fatherId: id,
          clients: "ggfwweb"
        });
      });
    },
    createItem(id) {
      this.log("createGroup", id);
      this.itemFormVisible = true;
      this.$nextTick(() => {
        this.itemForm.resetFields();
        this.itemForm.setFieldsValue({
          groupid: id,
          clients: "ggfwweb",
          topid: "1"
        });
      });
    },
    returnFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    handleFile() {
      return false;
    },
    handleNameChange(e) {
      const groupid = this.itemForm.getFieldValue("groupid");
      const input = e.target.value;
      const array = pinyin(input, {
        style: pinyin.STYLE_NORMAL
      });
      let suffix = "";
      for (let i in array) {
        suffix = suffix + array[i][0].charAt(0);
      }
      suffix = suffix.toUpperCase();
      this.log(`${groupid}_${suffix}`);
      this.itemForm.setFieldsValue({
        id: `${groupid}_${suffix}`
      });
    },
    handleGroupNameChange(e) {
      const fatherId = this.groupForm.getFieldValue("fatherId");
      const input = e.target.value;
      const array = pinyin(input, {
        style: pinyin.STYLE_NORMAL
      });
      let suffix = "";
      for (let i in array) {
        suffix = suffix + array[i][0].charAt(0);
      }
      suffix = suffix.toUpperCase();
      this.log(`${fatherId}_${suffix}`);
      this.groupForm.setFieldsValue({
        groupid: `${fatherId}_${suffix}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tree-limited {
  max-height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
