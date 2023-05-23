<template>
  <div>
    <!-- 資料 -->
    <el-table
      :data="records"
      class="table-container"
      border
      stripe
      @sort-change="onSortChange"
      @row-dblclick="onRowdblClick"
      @selection-change="onSelectionChange"
    >
      <!-- column -->
      <el-table-column v-if="selection == true" type="selection">
      </el-table-column>

      <el-table-column
        v-for="column in columns"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :align="column.align"
      >
        <template slot-scope="scope">
          <!-- checkbox -->
          <el-checkbox
            v-if="column.type == 'checkbox'"
            v-model.lazy="scope.row[column.prop]"
            @change="onAction(column.type, scope.row)"
          >
          </el-checkbox>
          <!-- button -->
          <el-button
            v-else-if="column.type == 'button'"
            size="mini"
            @click="onAction(column.event, scope.row)"
          >
            {{ column.name }}
          </el-button>
          <!-- link -->
          <el-link
            v-else-if="column.type == 'link'"
            size="mini"
            type="primary"
            @click="onAction(column.event, scope.row)"
          >
            {{ scope.row[column.prop] }}
          </el-link>
          <!-- input -->
          <el-input
            v-else-if="column.type == 'input'"
            size="mini"
            :type="column.dataType"
            v-model.lazy="scope.row[column.prop]"
            @keyup.enter.native="onAction(column.event, scope.row)"
          >
            <el-button
              slot="append"
              icon="el-icon-edit"
              @click="onAction(column.event, scope.row)"
            >
            </el-button>
          </el-input>
          <!-- 欄位值 -->
          <div v-else>
            {{ scope.row[column.prop] }}
          </div>
        </template>
      </el-table-column>
      <!-- actions -->
      <el-table-column
        v-if="custom != undefined"
        :fixed="custom.fixed"
        :prop="custom.prop"
        :label="custom.label"
        :min-width="custom.minWidth"
        :align="custom.align"
      >
        <template slot-scope="scope">
          <el-button
            v-for="action in custom.actions"
            v-if="action.isShow == true"
            @click="onAction(action.event, scope.row)"
            size="mini"
            :type="action.type"
            :icon="action.icon"
           
          >
          {{ action.name }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁 -->
    <el-row type="flex" v-if="pagination != undefined">
      <el-col :span="8"> </el-col>
      <el-col :span="16" align="end">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page="pagination.number"
          :page-size="pagination.size"
          :total="pagination.totalElements"
          layout="total,jumper,prev,pager,next,sizes"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    columns: {
      required: true,
    },
    records: {
      required: true,
    },
    custom: {
      required: true,
    },
    pagination: {
      required: true,
    },
    selection: true,
    // 預設選取
    isActions: {
      required: false,
      default: true,
      type: Boolean,
    },
  },
  created() {},
  methods: {
    onAction(event, val) {
      this.$emit("onAction", event, val);
    },
    onSortChange(val) {
      this.$emit("onSortChange", val);
    },
    onCurrentChange(val) {
      this.$emit("onCurrentChange", val);
    },
    onRowdblClick(val) {
      this.$emit("rowdblclick", val);
    },
    onSelectionChange(val) {
      this.$emit("selection-change", val);
    },
  },
};
</script>
