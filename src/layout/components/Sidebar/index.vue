<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="handleSelect"
      >
        <div v-for="menu in menus">
          <el-menu-item
            v-if="menu.hasChilds == false"
            @click="onNav(menu)"
            :index="menu.code"
            class="submenu-title-noDropdown"
          >
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
          </el-menu-item>
          <!-- 有子目錄 -->
          <el-submenu v-else :index="menu.code">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </template>

            <el-menu-item
              :index="sub.code"
              v-for="sub in menu.subs"
              v-if="sub.isActive"
              @click="onNav(sub)"
            >
              <span slot="title">{{ sub.name }}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-scrollbar>
    <div class="version-container">
      <p>前端版本：{{ version.front }}</p>
      <p>後端版本：{{ version.backend }}</p>
      <p>工作站點：{{ version.workStn }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import variables from "@/styles/variables.scss";

export default {
  components: { Logo },
  data() {
    return {
      menus: [],
      version: {
        front: "1.0.0",
        backend: "1.0.0",
        workStn: "",
      },
    };
  },
  created() {},
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  watch: {},
  methods: {
    async onLoad() {},
    async onNav(menu) {
      this.$router.push(menu.path);
    },
    handleSelect(key, keyPath) {},
  },
};
</script>
