<template>
  <a-tree-node>
    <a-tree-node
      v-for="group in tree"
      :key="group.groupid"
      :title="group.groupname"
    >
      <a-tree-node
        v-for="subGroup in group.functionGroupDTOS"
        :key="`${group.groupid}${subGroup.groupid}`"
        :title="subGroup.groupname"
      >
        <a-recursion-tree :tree="subGroup"></a-recursion-tree>
      </a-tree-node>
      <a-tree-node
        v-for="funcs in group.functionDTOS"
        :key="`${group.groupid}${funcs.id}`"
        :title="funcs.name"
      >
      </a-tree-node>
    </a-tree-node>
  </a-tree-node>
</template>

<script>
export default {
  name: "ARecursionTree",
  props: {
    tree: Array
  }
};
</script>

<style scoped lang="less"></style>
