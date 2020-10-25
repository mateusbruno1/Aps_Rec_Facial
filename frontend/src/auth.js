import api from "./services/api";

export const isAuth = async () =>
{

  const auth = await JSON.parse(localStorage.getItem('@Auth'));
  if (auth) {
    api.defaults.headers.Authorization = `Bearer ${auth.token}`;
    return true;
  }

  return false;
}


export const isMedic = async () =>
{

  const auth = await JSON.parse(localStorage.getItem('@Auth'));

  if (auth) {
    if(auth.medic === 'true'){
      return true;
    }
    return false;
  }
  return false;
}
