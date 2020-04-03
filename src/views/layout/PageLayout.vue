<template>
  <div class="page-layout">
    <div class="page-header">{{ $route.meta.name }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PageLayout"
};
</script>

<style lang="less" scoped>
.page-layout {
  .page-header {
    font-weight: bold;
  }
}
</style>
