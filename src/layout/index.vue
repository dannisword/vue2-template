<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <router-view style="margin-top: 50px"> </router-view>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import { Dialog } from "@/components/ModalDialog/Dialog.vue";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Dialog,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      funcName: "Layout",
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return process.env.VUE_APP_FIXED_HEADER;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    topic() {
      const workStn = localStorage.getItem("workStn");
      return `iwms/molie/${process.env.VUE_APP_ENV_CODE}/${workStn}/mode`;
    },
  },
  created() {},
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    handleMQTT(topic, message) {
      const val = JSON.parse(message);
      const sub = `[${this.funcName} (${Date()})] subscribe to topics ${topic}`;
      console.log(sub);
    },
  },
  beforeDestroy() {
    /*
    this.unsubscribe(this.funcName, this.topic).then(() => {
      this.disconnect();
    });*/
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.dialog {
  height: 80px;
  overflow: hidden;
  position: relative;
  background-color: #000;
}
</style>
