<template>
  <el-container
    v-loading="container.isLoading"
    :element-loading-text="container.message"
  >
    <el-main>
      <div class="form-container">
        <el-form :model="params" label-width="auto" :inline="true">
          <el-form-item label="子棧板編號">
            <el-input v-model="params.carrierId"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "A1000",
  data() {
    return {
      container: {
        isLoading: false,
        message: "載入中，請稍候...",
      },
      params: {},
    };
  },
};
</script>
