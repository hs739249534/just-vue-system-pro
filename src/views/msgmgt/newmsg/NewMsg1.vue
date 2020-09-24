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
            <a-radio-button :value="true">
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
          <a-input placeholder="请选择" @click="usersSelect" />
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
        <a-button
          key="submit"
          type="primary"
          @click="handleOk"
        >
          完成
        </a-button>
      </template>
      <div>
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
      </div>
    </a-modal>
  </div>
</template>

<script>
import difference from "lodash/difference";
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  });
}

const originTargetKeys = [];

const leftTableColumns = [
  {
    dataIndex: "title",
    title: "Name"
  },
  {
    dataIndex: "description",
    title: "Description"
  }
];
const rightTableColumns = [
  {
    dataIndex: "title",
    title: "Name"
  },
  {
    dataIndex: "description",
    title: "Description"
  }
];
export default {
  name: "NewMsg1",
  data() {
    return {
      mockData,
      targetKeys: originTargetKeys,
      leftColumns: leftTableColumns,
      rightColumns: rightTableColumns,

      usersShow: false,
      usersSelectShow: false
    };
  },
  methods: {
    usersSelect() {
      this.usersSelectShow = true;
      console.log("usersSelectShow", this.usersSelectShow);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.usersSelectShow = false;
    },
    handleOk() {
      console.log("Clicked ok button");
      this.usersSelectShow = false;
    },
    onChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },
    getRowSelection({ selectedKeys, itemSelectAll, itemSelect }) {
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
    }
  }
};
</script>

<style scoped></style>
