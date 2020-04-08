<template>
  <a-card :bordered="false">
    <div class="table-page">
      <a-row>
        <a-col :span="7">
          <a-tree
            showLine
            defaultExpandAll
            @select="onSelectTree"
            :treeData="topFuncs"
            :selectedKeys="topfuncsKeys"
          >
          </a-tree>
        </a-col>
        <a-col :span="9">
          <br />
          <a-form
            :form="groupForm"
            @submit="updateGroup"
            layout="vertical"
            v-if="groupFormVisible"
          >
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
                placeholder="请输入组名称"
              />
            </a-form-item>
            <a-form-item label="组描述">
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
            <a-form-item label="组图标">
              <a-input
                v-decorator="[
                  'groupicon',
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
            <a-form-item label="排序依据">
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
            <a-form-item label="应用开关">
              <a-switch
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
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">
                更新
              </a-button>
            </a-form-item>
          </a-form>

          <a-form
            :form="itemForm"
            @submit="updateItem"
            layout="vertical"
            v-if="itemFormVisible"
          >
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
                      // {
                      //   required: true,
                      //   message: '请输入功能编码'
                      // }
                    ]
                  }
                ]"
                disabled
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
                placeholder="请输入功能名称"
              />
            </a-form-item>
            <a-form-item label="功能图标">
              <a-input
                v-decorator="[
                  'icon',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入功能图标'
                      }
                    ]
                  }
                ]"
                placeholder="请输入功能图标"
              />
            </a-form-item>
            <a-form-item label="功能链接">
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
            <a-form-item label="排序依据">
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
            <a-form-item label="首页排序依据">
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
            <a-form-item label="停用标识">
              <a-switch
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
              />
            </a-form-item>
            <a-form-item label="匿名标识">
              <a-switch
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
              />
            </a-form-item>
            <a-form-item label="热点标识">
              <a-switch
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
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">
                更新
              </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import moment from "moment";
import http from "../../utils/http";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      topFuncs: [],
      topfuncsKeys: [],
      groupForm: this.$form.createForm(this, { name: "groupForm" }),
      groupFormVisible: false,
      itemForm: this.$form.createForm(this, { name: "itemForm" }),
      itemFormVisible: false
    };
  },
  created() {
    this.getTopFuncs();
  },
  methods: {
    moment,
    getTopFuncs() {
      // http
      //   .get({
      //     url: "sys/function/anonymous/v3/functions/top"
      //   })
      //   .then(ret => {
      //     this.log("getTopFuncs", ret);
      //     this.topFuncs = this.handleTreeData(ret);
      //   })
      //   .catch(err => {
      //     this.log("getTopFuncs", err);
      //   });
      http
        .get({
          url: "sys/function/anonymous/v4/functions/top"
        })
        .then(ret => {
          this.log("getTopFuncs", ret);
          this.topFuncs = this.handleTreeData(ret);
        })
        .catch(err => {
          this.log("getTopFuncs", err);
        });
    },
    handleTreeData(funcs) {
      // let _funcs = [];
      // funcs.map(func => {
      //   let _func = {};
      //   _func.title = func.functionname;
      //   _func.key = `group####${func.functionid}`;
      //   _func.children = [];
      //   if (func.items && func.items.length > 0) {
      //     func.items.map(item => {
      //       _func.children.push({
      //         title: item.itemname,
      //         key: `item####${item.itemid}`
      //       });
      //     });
      //   }
      //   if (func.groupList && func.groupList.length > 0) {
      //     _func.children = _func.children.concat(
      //       this.handleTreeData(func.groupList)
      //     );
      //   }
      //   _funcs.push(_func);
      // });
      // return _funcs;
      let _funcs = [];
      funcs.map(func => {
        let _func = {};
        _func.title = func.groupname;
        _func.key = `group####${func.groupid}`;
        _func.children = [];
        if (func.functionDTOS && func.functionDTOS.length > 0) {
          func.functionDTOS.map(item => {
            _func.children.push({
              title: item.name,
              key: `item####${item.id}`
            });
          });
        }
        if (func.functionGroupDTOS && func.functionGroupDTOS.length > 0) {
          _func.children = _func.children.concat(
            this.handleTreeData(func.functionGroupDTOS)
          );
        }
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
        const id = key.split("####")[1];
        if (type === "group") {
          this.getGroup(id);
        } else if (type === "item") {
          this.getItem(id);
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
              closed: ret.closed,
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
              anonymous: ret.anonymous,
              clients: ret.clients,
              closed: ret.closed,
              groupid: ret.groupid,
              id: ret.id,
              ishot: ret.ishot,
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
                clients: values.clients
              }
            })
            .then(ret => {
              this.log("updateGroup", ret);
              this.$message.success("更新成功");
            })
            .catch(err => {
              this.log("updateGroup", err);
              this.$message.error("更新失败");
            });
        }
      });
    },
    updateItem(e) {
      e.preventDefault();
      this.itemForm.validateFields((err, values) => {
        if (!err) {
          this.log("updateItem values", values);
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
                url: values.url
              }
            })
            .then(ret => {
              this.log("updateGroup", ret);
              this.$message.success("更新成功");
            })
            .catch(err => {
              this.log("updateGroup", err);
              this.$message.error("更新失败");
            });
        }
      });
    }
  }
};
</script>
