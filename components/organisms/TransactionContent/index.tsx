import { useCallback, useEffect, useState } from "react";
import { getMemberTransactions } from "../../../services/member";
import { toast } from "react-toastify";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";
import NumberFormat from "react-number-format";

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

export default function TransactionContent() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("all");
  const IMG_PATH = process.env.NEXT_PUBLIC_IMG;

  const getDataFromAPI = useCallback(
    async (value) => {
      const response = await getMemberTransactions(value);
      if (response.error) {
        toast.error(response.message);
      }

      const totalTransaction = response.data.total;
      const dataTransaction = response.data.data;

      setTotal(totalTransaction);
      setData(dataTransaction);
    },
    [getMemberTransactions]
  );

  useEffect(() => {
    getDataFromAPI("all");
  }, []);

  const onTabClick = (value) => {
    setTab(value);
    getDataFromAPI(value);
  };

  const renderedTransactionItem = () => {
    return data.map((item: TransactionItemTypes) => (
      <TableRow
        key={item._id}
        title={item.historyVoucherTopup.gameName}
        category={item.category.name}
        item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
        price={item.value}
        status={item.status}
        image={`${IMG_PATH}/${item.historyVoucherTopup.thumbnail}`}
        id={item._id}
      />
    ));
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat
              value={total}
              prefix="Rp "
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab
                onClick={() => onTabClick("all")}
                title="All Trx"
                active={tab === "all"}
              />
              <ButtonTab
                onClick={() => onTabClick("success")}
                title="Success"
                active={tab === "success"}
              />
              <ButtonTab
                onClick={() => onTabClick("pending")}
                title="Pending"
                active={tab === "pending"}
              />
              <ButtonTab
                onClick={() => onTabClick("failed")}
                title="Failed"
                active={tab === "failed"}
              />
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">{renderedTransactionItem()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
