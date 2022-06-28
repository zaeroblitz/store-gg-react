import React from "react";
import Row from "./Row";

export default function PaymentInformations() {
  return (
    <div className="payment pt-10 pb-10">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">
        Payment Informations
      </h2>

      <Row label="Your Account Name" value="Masayoshi Angga Zero" />
      <Row label="Type" value="Worldwide Transfer" />
      <Row label="Bank Name" value="Mandiri" />
      <Row label="Bank Account Name" value="PT Store GG Indonesia" />
      <Row label="Bank Number" value="1800 - 9090 - 2021" />
    </div>
  );
}
