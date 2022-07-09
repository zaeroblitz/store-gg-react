import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getMemberOverview = async () => {
  const ENDPOINT = `players/dashboard`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
    token: true,
  });
};

export const getMemberTransactions = async (param: string) => {
  let params = "";

  if (param === "all") {
    params = "";
  } else {
    params = `?status=${param}`;
  }

  const ENDPOINT = `players/history`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}${params}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
    token: true,
  });
};

export const getMemberTransactionDetail = async (id: string, token: string) => {
  const ENDPOINT = `players/history/${id}/detail`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
    serverToken: token,
  });
};
