import { useCallback, useEffect, useState } from "react";
import { getMemberOverview } from "../../../services/member";
import TransactionItem from "./TransactionItem";
import { toast } from "react-toastify";

interface TransactionItemTypes {
  _id: string;
  historyVoucherTopup: {
    gameName: string;
    coinName: string;
    coinQuantity: string;
    thumbnail: string;
    price: number;
  };
  category: {
    name: string;
  };
  status: "pending" | "success" | "failed";
  value: number;
}

export default function Transaction() {
  const [data, setData] = useState([]);

  const getDataFromAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    }

    const transctionData = response.data.data;
    setData(transctionData);
  }, [getMemberOverview]);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const renderedTransactionItem = () => {
    return data.map((item: TransactionItemTypes) => (
      <TransactionItem
        key={item._id}
        title={item.historyVoucherTopup.gameName}
        category={item.category.name}
        item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
        price={item.value}
        status={item.status}
        image={`${IMG_PATH}/${item.historyVoucherTopup.thumbnail}`}
      />
    ));
  };

  const IMG_PATH = process.env.NEXT_PUBLIC_IMG;

  return (
    <div className="latest-transaction">
      <p className="text-lg fw-medium color-palette-1 mb-14">
        Latest Transactions
      </p>
      <div className="main-content main-content-table overflow-auto">
        <table className="table table-borderless">
          <thead>
            <tr className="color-palette-1">
              <th className="text-start" scope="col">
                Game
              </th>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{renderedTransactionItem()}</tbody>
        </table>
      </div>
    </div>
  );
}
