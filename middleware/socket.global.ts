import useSocketStore from "~/store/socketStore";
export default defineNuxtRouteMiddleware((to, from) => {
  const socketStore = useSocketStore();
  const isConnected = socketStore.isConnected; //判斷是否連上websocket
  // const hasPermission = false; // 判斷有無頁面權限
  if (to.path !== "/") {
    if (!isConnected) {
      return navigateTo("/");
    }
  }

  // if (!hasPermission) {
  //     return abortNavigation({
  //         statusCode: 403
  //         statusMessage: '無頁面權限'
  //     });
  // }
});
