<template>
  <div>
    <h1>模拟</h1>
    <el-row :gutter="20" class="box-content">
      <el-col :span="6" v-for="(building, index) in buildings" :key="index">
        <div class="building">
          <div class="building-label">{{ building.label }}</div>
          <div v-for="floor in building.floors" :key="floor" class="floor">
            <div class="foot-title">{{ floor.title }}</div>
            <div
              v-for="window in floor.windows"
              :key="window"
              class="window"
              @click="showPopup(floor.type)"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 左侧面板 -->
    <!-- <div v-if="popupVisible" class="popup-content">
      <TableCompt />
    </div> -->

    <div class="details-table">
      <el-dialog
        @close="closePopup"
        width="40%"
        v-model="popupVisible"
        :modal="true"
        :draggable="true"
        :close-on-click-modal="false"
        class="custom-dialog"
        :left="'20px'"
        destroy-on-close
        append-to-body
        :modal-class="`custom-modal-dialog`"
      >
        <TableCompt :currentItem="currentItem" />
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableCompt from "./Table.vue";

export default defineComponent({
  components: { TableCompt },

  setup() {
    const buildings = ref([
      {
        label: "党的建设",
        floors: [
          { windows: Array(5).fill(null), title: "党员理论学习", type: 1 },
          { windows: Array(5).fill(null), title: "党建长廊建设", type: 2 },
          { windows: Array(5).fill(null), title: "下乡慰问" },
          { windows: Array(5).fill(null), title: "组织建设" },
          { windows: Array(5).fill(null), title: "作风建设" },
          { windows: Array(5).fill(null), title: "思想建设" },
          { windows: Array(5).fill(null), title: "纪律建设" },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
        ],
      },
      {
        label: "人文关怀",
        floors: [
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
        ],
      },
      {
        label: "业务办理",
        floors: [
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
        ],
      },
      {
        label: "基础设施建设",
        floors: [
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
          { windows: Array(5).fill(null) },
        ],
      },
    ]);

    const popupVisible = ref(false);
    const detailsVisible = ref(false);
    const currentItem = ref(null);

    const showPopup = (type: number) => {
      currentItem.value = type || 1;
      popupVisible.value = true;
    };

    const closePopup = () => {
      popupVisible.value = false;
    };

    const showDetailsPopup = (itemIndex: number) => {
      detailsVisible.value = true;
    };

    const closeDetailsPopup = () => {
      detailsVisible.value = false;
    };

    return {
      buildings,
      popupVisible,
      detailsVisible,
      currentItem,
      showPopup,
      closePopup,
      showDetailsPopup,
      closeDetailsPopup,
    };
  },
});
</script>

<style lang="less" scoped>



.box-content {
  display: flex;
  align-items: flex-end;
}
.building {
  display: inline-block;
  margin: 20px;
  border: 1px solid #000;
  text-align: center;
  vertical-align: bottom;
}

.floor {
  background-color: #ddd;
  padding: 10px;
  border-bottom: 1px solid #000;
  position: relative;

  .foot-title {
    position: absolute;
    top: -14px;
    left: 2px;
    background: #ddd;
    font-size: 14px;
    font-weight: 500;
  }
}

.window {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: lightblue;
  margin: 5px;
  border: 1px solid #000;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: lightgreen;
  }
}

.window::before,
.window::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.window::before {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.window::after {
  top: 0;
  left: 50%;
  height: 100%;
  width: 2px;
  transform: translateX(-50%);
}

.building-label {
  font-size: 16px;
  margin-top: 5px;
  color: #fff;
  margin: 20px;
}

body {
  text-align: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
  overflow-y: auto;
  position: absolute;
  top: 20px;
  left: 30px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
<style>
/* ::v-deep.el-dialog {
  pointer-events: auto;
} */
</style>
