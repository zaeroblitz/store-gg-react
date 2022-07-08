import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getFeaturedGame = async () => {
  const ENDPOINT = "players/landing-page";
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
  });
};

export const getVoucherDetail = async (id: any) => {
  const ENDPOINT = `players/${id}/detail`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
  });
};

export const getGameCategory = async () => {
  const ENDPOINT = `players/category`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "GET",
    data: null,
  });
};

export const setCheckout = async (data: CheckoutTypes) => {
  const ENDPOINT = `players/checkout`;
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};
