import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getFeaturedGame = async () => {
  const ENDPOINT = "players/landing-page";

  const { data } = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);

  return data.data;
};

export const getVoucherDetail = async (id: any) => {
  const ENDPOINT = `players/${id}/detail`;

  const { data } = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);

  return data.data;
};
