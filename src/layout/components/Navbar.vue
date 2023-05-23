<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <!-- 站點管理 -->
    <div class="right-menu" v-if="readOnly == true">
      站別：
      <span style="margin-right: 10px">
        {{ workStn }}
      </span>
      模式：
      <span style="margin-right: 10px">
        {{ online }}
      </span>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{ this.$store.state.user.name }}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 非站點管理 -->
    <div class="right-menu" v-else>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{ this.$store.state.user.name }}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  data() {
    return {
      funcName: "NavBar",
      isAutoNav: false,
      user: {},
      workStn: "",
      online: "",
      operating: [],
      options: [],
      stations: [],
      attendances: [],
      readOnly: false,
      workModel: {
        id: 0,
        value: "無",
        label: "無",
      },
    };
  },
  async created() {

  },
  watch: {

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(90deg, #6868fd, #75ebfd);
  box-shadow: 0 1px 4px rgba(15, 67, 116, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 0px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.el-select .el-input_i {
  font-size: 10px;
}

.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
