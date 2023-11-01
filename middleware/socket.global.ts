import useSocketStore from "~/store/socketStore";
import useLoginStore from "~/store/LoginStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
export default defineNuxtRouteMiddleware((to, from) => {
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
      return false;
    } else {
      console.log("2");
      const expvaild = checkexp(localtoken);
      console.log("expvaild", expvaild);
      if (!expvaild) {
        console.log("3");
        localStorage.clear();
        router.push({ path: "/Login" });
        return false;
      } else return true;
    }
  };
  // checktoken();
  console.log(to, from);
  if (to.path === "/Login") return true;
  else {
    const result = checktoken();
    return result;
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
