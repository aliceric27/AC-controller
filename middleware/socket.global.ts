import useSocketStore from "~/store/socketStore";
import useLoginStore from "~/store/LoginStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
export default defineNuxtRouteMiddleware((to, from) => {
  const { $swal } = useNuxtApp();
  const router = useRouter();
  const socketStore = useSocketStore();
  const loginStore = useLoginStore();
  loginStore.initializeToken();
  const checkexp = loginStore.checkTokenVaild;
  const isConnected = socketStore.isConnected; //判斷是否連上websocket
  const isMokemode = socketStore.isMokemode;
  const hasPermission = false; // 判斷有無頁面權限
  const localtoken = loginStore.token;
  const checktoken = () => {
    if (!localtoken) {
      console.log("1");
      router.push({ path: "/Login" });
      $swal.fire({
        title: "請重新登入",
        text: "憑證過期",
        icon: "warning",
        confirmButtonText: "確認",
      });
      return false;
    } else {
      console.log("2");
      const expvaild = checkexp(localtoken);
      console.log("expvaild", expvaild);
      if (!expvaild) {
        console.log("3");
        localStorage.clear();
        return navigateTo({ path: "/Login" });
        $swal.fire({
          title: "請重新登入",
          text: "憑證過期",
          icon: "warning",
          confirmButtonText: "確認",
        });
      } else return navigateTo();
    }
  };
  // checktoken();
  console.log(to, from);
  if (to.path === "/Login") return true;
  if (to.name === "controller-page" || to.name === "room-page") {
    console.log("floorList.floorList.length", socketStore.floorList.length);
    if (!socketStore.floorList.length) {
      console.log("ok");
      navigateTo();
      return navigateTo({ name: "index" });
    }
  } else {
    checktoken();
    // return navigateTo(to.fullPath);  `
  }

  // check socket is online
  // if (to.path !== "/") {
  //   if (!isConnected && !isMokemode) {
  //     return navigateTo("/Login");
  //   }
  // }

  // if (!hasPermission) {
  //     return abortNavigation({
  //         statusCode: 403
  //         statusMessage: '無頁面權限'
  //     });
  // }
});
