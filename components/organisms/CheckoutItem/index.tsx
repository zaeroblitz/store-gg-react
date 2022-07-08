import { useEffect, useState } from "react";

export default function CheckoutItem() {
  const IMG_PATH = process.env.NEXT_PUBLIC_IMG;
  const [dataItem, setDataItem] = useState({
    category: {},
    name: "",
    nominals: [],
    status: "",
    thumbnail: "",
    user: {},
    id: "",
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("data-item");
    const dataItemLocal = JSON.parse(dataFromLocal!);
    setDataItem(dataItemLocal);
  }, []);

  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <img
            src={`${IMG_PATH}/${dataItem.thumbnail}`}
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">{dataItem.name}</p>
        <p className="color-palette-2 m-0">{dataItem.category.name}</p>
      </div>
    </div>
  );
}
