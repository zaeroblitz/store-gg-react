import React from "react";
import Row from "./Row";

interface PaymentInformationsProps {
  data: {
    type: string;
    bankName: string;
    name: string;
    noRekening: string;
  };
}

export default function PaymentInformations({
  data,
}: PaymentInformationsProps) {
  return (
    <div className="payment pt-10 pb-10">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">
        Payment Informations
      </h2>

      <Row label="Your Account Name" value="Masayoshi Angga Zero" />
      <Row label="Type" value={data.type} />
      <Row label="Bank Name" value={data.bankName} />
      <Row label="Bank Account Name" value={data.name} />
      <Row label="Bank Number" value={data.noRekening} />
    </div>
  );
}
