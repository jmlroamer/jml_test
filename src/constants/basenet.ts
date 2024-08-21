const IS_DEV = import.meta.env.DEV;
const devbasesys = import.meta.env.VITE_APP_BASESIS_API;
const basehost = window.location.protocol + "//" + window.location.hostname;
const sysporthash = ":7460/#/home";

export const usebasesys = IS_DEV ? devbasesys : basehost + sysporthash;
// export const usebasesys = basehost + sysporthash;

export const predzmurlheader =
  location.hostname == "localhost"
    ? "http://10.43.223.61:7464"
    : location.protocol + "//" + location.hostname + ":7464";
