import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { setSignUp } from "../services/auth";
import { getGameCategory } from "../services/player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function SignUpPhoto() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [localUserFormData, setLocalUserFormData] = useState({
    name: "",
    email: "",
  });

  const getGameCategoryAPI = useCallback(async () => {
    const { data } = await getGameCategory();
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalUserFormData = localStorage.getItem("user-form");

    setLocalUserFormData(JSON.parse(getLocalUserFormData));
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const getLocalUserFormData = await localStorage.getItem("user-form");
    const form = JSON.parse(getLocalUserFormData);
    const data = new FormData();

    data.append("email", form.email);
    data.append("name", form.name);
    data.append("username", form.name);
    data.append("password", form.password);
    data.append("image", image);
    data.append("phoneNumber", "08123456789");
    data.append("favorite", favorite);

    const result = await setSignUp(data);
    if (result.error === 1) {
      toast.error(result.message);
    } else {
      toast.success("Registrasi berhasil!");
      router.push("/sign-up-success");
      localStorage.removeItem("user-form");
    }
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
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
                      <Image
                        src="/icon/upload.svg"
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
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localUserFormData.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localUserFormData.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  defaultValue={favorite}
                  onChange={(e) => setFavorite(e.target.value)}
                >
                  {categories.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                type="submit"
                role="button"
              >
                Create My Account
              </button>
              <button
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                role="button"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
