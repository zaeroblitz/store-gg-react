import callAPI from "../config/api";
import { SignInTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const setSignUp = async (data: FormData) => {
  const ENDPOINT = "auth/sign-up";
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "POST",
    data,
  });
};

export const setSignIn = async (data: SignInTypes) => {
  const ENDPOINT = "auth/sign-in";
  const url = `${ROOT_API}/${API_VERSION}/${ENDPOINT}`;

  return await callAPI({
    url,
    method: "POST",
    data,
  });
};
