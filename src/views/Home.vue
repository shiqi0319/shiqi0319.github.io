<template>
  <div class="container">
    <!-- 主内容 -->
    <div class="modules-wrapper">
      <div
        v-for="item in modules"
        :key="item.id"
        class="module-item"
        @click="openPanel1(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 左侧面板 -->
    <div v-show="panel1.visible" class="custom-panel left-panel">
      <div class="panel-header">
        <h3>{{ panel1.title }}</h3>
        <el-button @click="panel1.visible = false">×</el-button>
      </div>
      <div class="panel-content">
        <div
          v-for="item in panel1.items"
          :key="item.id"
          class="content-item"
          @click="selectItem(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>

    <!-- 右侧面板 -->
    <div v-show="panel2.visible" class="custom-panel right-panel">
      <div class="panel-header">
        <h3>{{ panel2.title }}</h3>
        <el-button @click="panel2.visible = false">×</el-button>
      </div>
      <div class="panel-content">
        <div class="detail-view">
          <template v-if="panel2.currentItem">
            <h4>{{ panel2.currentItem.title }}</h4>
            <p>{{ panel2.currentContent }}</p>
            <div class="meta-info">最后更新：{{ panel2.updateTime }}</div>
          </template>
          <div v-else class="empty-tip">请选择左侧内容</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface Module {
  id: number;
  name: string;
}

interface PanelItem {
  id: number;
  title: string;
  content: string;
}

// 主模块数据
const modules = ref<Module[]>([
  { id: 1, name: "模块1" },
  { id: 2, name: "模块2" },
  { id: 3, name: "模块3" },
]);

// 左侧面板状态
const panel1 = reactive({
  visible: false,
  title: "左侧面板",
  items: [] as PanelItem[],
  currentModule: null as Module | null,
});

// 右侧面板状态
const panel2 = reactive({
  visible: false,
  title: "右侧面板",
  currentItem: null as PanelItem | null,
  currentContent: "",
  updateTime: "",
});

// 打开左侧面板
const openPanel1 = (module: Module) => {
  panel1.visible = true;
  panel1.currentModule = module;
  panel1.items = loadPanel1Data(module.id);
};

// 选择左侧内容
const selectItem = (item: PanelItem) => {
  // 保持右侧面板打开状态
  panel2.visible = true;
  panel2.currentItem = item;
  updatePanel2Content();
};

// 更新右侧内容
const updatePanel2Content = () => {
  if (!panel2.currentItem) return;

  // 模拟内容更新
  panel2.currentContent =
    `当前内容：${panel2.currentItem.content}\n` +
    `更新时间：${new Date().toLocaleTimeString()}`;

  panel2.updateTime = new Date().toLocaleString();
};

// 数据加载方法
const loadPanel1Data = (moduleId: number): PanelItem[] => {
  return [
    {
      id: 1,
      title: `项目${moduleId}-1`,
      content: "初始内容A",
    },
    {
      id: 2,
      title: `项目${moduleId}-2`,
      content: "初始内容B",
    },
    {
      id: 3,
      title: `项目${moduleId}-3`,
      content: "初始内容C",
    },
  ];
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  padding: 20px;
}

.modules-wrapper {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.module-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
}

.custom-panel {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;

    h3 {
      margin: 0;
      font-size: 16px;
    }

    .el-button {
      padding: 4px;
      min-width: auto;
    }
  }

  .panel-content {
    padding: 16px;
    max-height: 70vh;
    overflow-y: auto;
  }
}

.left-panel {
  left: 20px;
  animation: slideLeft 0.3s ease;
}

.right-panel {
  right: 20px;
  animation: slideRight 0.3s ease;
}

.content-item {
  padding: 12px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e9ecef;
  }
}

.detail-view {
  h4 {
    margin: 0 0 12px;
    color: #333;
  }

  p {
    white-space: pre-wrap;
    line-height: 1.6;
    color: #666;
  }

  .meta-info {
    margin-top: 12px;
    font-size: 12px;
    color: #999;
  }

  .empty-tip {
    color: #999;
    text-align: center;
    padding: 20px;
  }
}

@keyframes slideLeft {
  from {
    transform: translate(-20px, -50%);
    opacity: 0;
  }
  to {
    transform: translate(0, -50%);
    opacity: 1;
  }
}

@keyframes slideRight {
  from {
    transform: translate(20px, -50%);
    opacity: 0;
  }
  to {
    transform: translate(0, -50%);
    opacity: 1;
  }
}
</style>
