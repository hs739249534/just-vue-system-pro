<template>
  <div style="padding: 72px 96px;">
    <a-row :gutter="32" type="flex">
      <a-col flex="256px">
        <div style="height: 32px; width: 256px">
          <a-input-search
            placeholder="请输入"
            style="width: 200px; display: inline-block; float:left"
            @search="onSearch"
          />
          <a-icon
            type="folder-add"
            class="add-icon"
            @click="
              a => {
                groupFormVisible = true;
                itemFormVisible = false;
              }
            "
          />
          <a-icon
            type="file-add"
            class="add-icon"
            @click="
              b => {
                itemFormVisible = true;
                groupFormVisible = false;
              }
            "
          />
        </div>
        <div style="width: 256px">
          <a-directory-tree
            multiple
            default-expand-all
            :tree-data="treeData"
            :replace-fields="replaceFields"
            @select="onSelectTree"
            @expand="onExpand"
          >
            <!--            <a-tree-node key="0-0" title="parent 0">-->
            <!--              <a-tree-node key="0-0-0" title="leaf 0-0" is-leaf />-->
            <!--              <a-tree-node key="0-0-1" title="leaf 0-1" is-leaf />-->
            <!--            </a-tree-node>-->
            <!--            <a-tree-node key="0-1" title="parent 1">-->
            <!--              <a-tree-node key="0-1-0" title="leaf 1-0" is-leaf />-->
            <!--              <a-tree-node key="0-1-1" title="leaf 1-1" is-leaf />-->
            <!--            </a-tree-node>-->
          </a-directory-tree>
        </div>
      </a-col>
      <a-col flex="auto" style="padding-left: 48px">
        <div style="height: 32px" />
        <a-form layout="vertical" :form="groupForm" v-if="groupFormVisible">
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
                  placeholder="NULL"
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
                  placeholder="请输入组编码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
                label="图片URL"
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
                  placeholder="请输入图片URL地址"
                />
              </a-form-item>
              <a-form-item
                v-if="groupForm.getFieldValue('iconFlag')"
                label="组图标上传"
              >
                <a-upload
                  v-decorator="[
                    'iconFile',
                    {
                      valuePropName: 'fileList',
                      getValueFromEvent: returnFile
                    }
                  ]"
                  list-type="picture-card"
                >
                  <div>
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  <span v-if="isUpdate">更新</span>
                  <span v-else>新建</span>
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>

        <a-form :form="itemForm" layout="vertical" v-if="itemFormVisible">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
            </a-col>
            <a-col :span="12">
              <a-form-item label="首页热点排序依据">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
            </a-col>
            <a-col :span="12">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="6">
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
            </a-col>
            <a-col :span="6">
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
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="6">
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
            </a-col>
          </a-row>

          <a-row :gutter="32">
            <a-col :span="12">
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
                v-if="!itemForm.getFieldValue('iconFlag')"
                label="图片URL"
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
                  placeholder="请输入图片URL地址"
                />
              </a-form-item>
              <a-form-item
                v-if="itemForm.getFieldValue('iconFlag')"
                label="组图标上传"
              >
                <a-upload
                  v-decorator="[
                    'iconFile',
                    {
                      valuePropName: 'fileList',
                      getValueFromEvent: returnFile
                    }
                  ]"
                  list-type="picture-card"
                >
                  <div>
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="32">
            <a-col :span="12">
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
          </a-row>
          <a-row>
            <a-col>
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
</template>

<script>
export default {
  data() {
    return {
      groupForm: this.$form.createForm(this, { name: "groupForm" }),
      itemForm: this.$form.createForm(this, { name: "itemForm" }),
      groupFormVisible: false,
      itemFormVisible: false,
      isUpdate: false,
      treeData: [
        {
          name: "A层级菜单1",
          key: "0-0",
          child: [
            {
              name: "B层级菜单1",
              key: "0-0-0",
              // disabled: true,
              child: [
                { name: "leaf", key: "0-0-0-0", isLeaf: true },
                { name: "leaf", key: "0-0-0-1", isLeaf: true }
              ]
            },
            {
              name: "B层级菜单2",
              key: "0-0-1",
              child: [{ key: "0-0-1-0", name: "zcvc", isLeaf: true }]
            }
          ]
        }
      ],
      replaceFields: {
        children: "child",
        title: "name"
      }
    };
  },
  methods: {
    onSearch() {},
    onSelectTree(keys) {
      console.log("Trigger Select", keys);
    },
    onExpand() {
      // console.log("Trigger Expand");
    }
  }
};
</script>

<style scoped>
.add-icon {
  display: inline-block;
  float: left;
  font-size: 20px;
  line-height: 28px;
  margin: 4px 0 0 4px;
}
</style>
