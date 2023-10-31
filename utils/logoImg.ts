export const getProjectLogo = () => {
  const ENV: string = import.meta.env.MODE;
  const async logo =()=>awaitimport("~/Assets/images/Logo.png");
  let logoImg = "";
  switch (ENV) {
    case "development":
      logoImg = logo;
      break;
    case "production":
      logoImg = logo;
      break;
    default:
      break;
  }
  console.log(logoImg);
  return logoImg;
};
