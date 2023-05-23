import router from "./router";
import moment from "moment";
import { getUserInfo, clearStorageItem } from "@/utils/localStorage";

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  const userInfo = getUserInfo();
  if (userInfo == null) {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=A1000`);
    }
    return;
  } else {
    next();
  }

  if (to.path === "/login") {
    next({ path: "/" });
  }
});
