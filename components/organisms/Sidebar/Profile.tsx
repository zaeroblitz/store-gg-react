import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {
  JWTPayloadTypes,
  UserPayloadTypes,
} from "../../../services/data-types";

export default function Profile() {
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const jwt = atob(token);
      const jwtPayload: JWTPayloadTypes = jwt_decode(jwt);
      const player: UserPayloadTypes = jwtPayload.player;
      const IMG_PATH = process.env.NEXT_PUBLIC_IMG;
      player.avatar = `${IMG_PATH}/${player.avatar}`;
      setUser(player);
    }
  }, []);

  return (
    <div className="user text-center pb-50 pe-30">
      <img
        src={user.avatar}
        width="90"
        height="90"
        className="img-fluid mb-20"
        alt=""
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
