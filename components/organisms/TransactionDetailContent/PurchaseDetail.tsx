import Row from "./Row";

interface PurchaseDetailProps {
  data: {
    gameID: string;
    gameItem: string;
    price: number;
    tax: number;
    value: number;
  };
}

export default function PurchaseDetail({ data }: PurchaseDetailProps) {
  return (
    <div className="purchase pt-30">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">
        Purchase Details
      </h2>
      <Row label="Your Game ID" value={data.gameID} />
      <Row label="Order ID" value="#GG001" />
      <Row label="Item" value={data.gameItem} />
      <Row label="Price" value={data.price} />
      <Row label="Tax (10%)" value={data.tax} />
      <Row label="Total" value={data.value} className="color-palette-4" />
    </div>
  );
}
