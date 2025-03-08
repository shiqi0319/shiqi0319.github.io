<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @row-click="handleClick"
    >
      <el-table-column prop="title" label="" width="180" />
      <el-table-column prop="content" label="" />
    </el-table>

    <el-dialog
      @close="closeDetailsPopup"
      width="40%"
      v-model="detailsVisible"
      :modal="false"
      :draggable="true"
      :close-on-click-modal="true"
      append-to-body
      class="details-dialog"
      :modal-class="`details-modal-table`"
    >
      <div class="table-container">
        <div class="details-content">
          {{ rowDetails }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import { table1, table2 } from "./mock";
import { ElMessage } from "element-plus";

export default {
  name: "Table",

  props: {
    currentItem: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const { currentItem } = toRefs(props);
    const tableData = ref([]);
    const detailsVisible = ref(false);
    const rowDetails = ref("");

    onMounted(() => {
      // tableData.value = Math.random() < 0.5 ? table1 : table2;

      updateTableData();
    });

    const updateTableData = () => {
      if (detailsVisible.value) {
        detailsVisible.value = false;
      }
      if (currentItem.value === 1) {
        tableData.value = table1;
      } else if (currentItem.value === 2) {
        tableData.value = table2;
      } else {
        // 随机选择 table1 或 table2
        tableData.value = Math.random() < 0.5 ? table1 : table2;
      }
    };

    watch(currentItem, () => {
      updateTableData();
    });
    const handleClick = (row: any) => {
      console.log(row);
      if (!row.details) {
        ElMessage({
          message: "暂无数据",
          type: "warning",
        });
        detailsVisible.value = false;
        return;
      }
      detailsVisible.value = true;

      rowDetails.value = row.details;
    };

    const closeDetailsPopup = () => {
      detailsVisible.value = false;
    };

    return {
      tableData,
      detailsVisible,
      rowDetails,
      handleClick,
      closeDetailsPopup,
    };
  },
};
</script>

<style lang="scss" scoped>
.details-content {
  background: #fff;
}
</style>

<style></style>
