<template>
  <a-card :bordered="false">
    <div class="table-page">
      <div class="operator">
        <a-button type="primary" @click="createGroup">新建菜单组</a-button>
      </div>
      <a-divider></a-divider>
      <a-row>
        <a-col :span="4">
          <a-tree :showLine="true" @select="onSelectTree" :treeData="treeData">
          </a-tree>
        </a-col>
        <a-col :span="20">
          <br />
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
                      {
                        required: true,
                        message: '请输入功能链接'
                      }
                    ]
                  }
                ]"
                placeholder="请输入功能链接"
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
            <a-form-item label="匿名标识">
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
            <a-form-item label="停用标识">
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
            <a-form-item label="热点标识">
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
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import moment from "moment";
import http from "../../utils/http";

const list = [
  {
    fatherId: "0",
    groupid: "0-1",
    groupname: "菜单组1",
    functionDTOS: [
      {
        id: "1",
        name: "菜单组1功能1"
      },
      {
        id: "2",
        name: "菜单组1功能2"
      }
    ],
    functionGroupDTOS: [
      {
        fatherId: "0-1",
        groupid: "0-1-1",
        groupname: "菜单组1菜单组1",
        functionDTOS: [
          {
            id: "3",
            name: "菜单组1菜单组1功能3"
          }
        ],
        functionGroupDTOS: []
      }
    ]
  }
];

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      list,
      treeData: [],
      labelCol: {
        lg: { span: 7 },
        sm: { span: 7 }
      },
      wrapperCol: {
        lg: { span: 10 },
        sm: { span: 17 }
      },
      groupForm: this.$form.createForm(this, { name: "groupForm" }),
      funcForm: this.$form.createForm(this, { name: "funcForm" })
    };
  },
  created() {
    this.treeData = this.handleTreeData(this.list);
    // this.log("treeData", this.treeData);
    this.getTopFuncs();
  },
  methods: {
    moment,
    getTopFuncs() {
      http
        .get({
          url: "sys/function/anonymous/v3/functions/top"
        })
        .then(ret => {
          this.log("getTopFuncs", ret);
        })
        .catch(err => {
          this.log("getTopFuncs", err);
        });
    },
    onSelectTree(arg, evt) {
      this.log(arg, evt);
    },
    createGroup() {},
    handleTreeData(groups) {
      let rets = [];
      groups.map(group => {
        let ret = {};
        ret.title = group.groupname;
        ret.key = group.groupid;
        ret.children = [];
        if (group.functionDTOS && group.functionDTOS.length > 0) {
          group.functionDTOS.map(func => {
            ret.children.push({ title: func.name, key: func.id });
          });
        }
        if (group.functionGroupDTOS && group.functionGroupDTOS.length > 0) {
          ret.children = ret.children.concat(
            this.handleTreeData(group.functionGroupDTOS)
          );
        }
        rets.push(ret);
      });
      return rets;
    }
  }
};
</script>
