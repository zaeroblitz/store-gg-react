import { useCallback, useEffect, useState } from "react";
import { getMemberOverview } from "../../../services/member";
import TopUpItem from "./TopUpCategoryItem";
import { toast } from "react-toastify";

interface TopUpItemTypes {
  _id: string;
  name: string;
  value: number;
}

export default function TopUpCategory() {
  const [count, setCount] = useState([]);

  const getDataFromAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    }
    const dataCounts = response.data.counts;
    setCount(dataCounts);
  }, [getMemberOverview]);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const renderedTopUpItem = () => {
    return count.map((item: TopUpItemTypes) => (
      <TopUpItem
        key={item._id}
        title={item.name}
        icon={
          item.name === "desktop" ? "icon-topup-desktop" : "icon-topup-mobile"
        }
        type={item.name}
        spent={item.value}
      />
    ));
  };

  return (
    <div className="top-up-categories mb-30">
      <p className="text-lg fw-medium color-palette-1 mb-14">
        Top Up Categories
      </p>
      <div className="main-content">
        <div className="row">{renderedTopUpItem()}</div>
      </div>
    </div>
  );
}
