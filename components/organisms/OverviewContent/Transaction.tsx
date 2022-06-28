import TransactionItem from "./TransactionItem";

export default function Transaction() {
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
          <tbody>
            <TransactionItem
              title="Mobile Legend"
              category="Mobile"
              item={200}
              price={290000}
              status="Pending"
              image="overview-1"
            />
            <TransactionItem
              title="Call of Duty Mobile"
              category="Mobile"
              item={550}
              price={740000}
              status="Success"
              image="overview-2"
            />
            <TransactionItem
              title="Clash of Clans"
              category="Mobile"
              item={100}
              price={100000}
              status="Failed"
              image="overview-3"
            />
            <TransactionItem
              title="Valorant"
              category="Dekstop"
              item={225}
              price={200000}
              status="Pending"
              image="overview-4"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
