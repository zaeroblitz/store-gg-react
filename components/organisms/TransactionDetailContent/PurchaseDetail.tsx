import Row from "./Row";

export default function PurchaseDetail() {
  return (
    <div className="purchase pt-30">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">
        Purchase Details
      </h2>
      <Row label="Your Game ID" value="masayoshizero" />
      <Row label="Order ID" value="#GG001" />
      <Row label="Item" value="250 Diamonds" />
      <Row label="Price" value="Rp 42.280.500" />
      <Row label="Tax (10%)" value="Rp 4.228.000" />
      <Row label="Total" value="Rp 55.000.600" className="color-palette-4" />
    </div>
  );
}
