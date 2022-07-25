import Image from "next/image";
import { useEffect, useState } from "react";

import Input from "../../components/atoms/Input";
import Sidebar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserPayloadTypes } from "../../services/data-types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { putPlayerProfile } from "../../services/member";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("image", user.avatar);
    data.append("name", user.name);

    const response = await putPlayerProfile(data);

    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />

      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form onSubmit={onSubmit}>
              <div className="photo d-flex">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        width={120}
                        height={120}
                        alt="upload"
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={user.avatar}
                        width={120}
                        height={120}
                        alt="upload"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" value={user.email} disabled />
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="submit"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  role="button"
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
