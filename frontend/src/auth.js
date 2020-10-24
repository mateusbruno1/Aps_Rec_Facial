import api from "./services/api";

export const isAuth = async () =>
{
  const auth = await localStorage.getItem('@jwt');

  if (auth) {
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(auth.token)}`;
    return true;
  }

  return false;
}
