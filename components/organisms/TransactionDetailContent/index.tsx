import React from "react";
import ItemDetail from "./ItemDetail";
import PaymentInformations from "./PaymentInformations";
import PurchaseDetail from "./PurchaseDetail";

interface TransactionDetailContentProps {
  transactionDetail: {
    _id: string;
    accountUser: string;
    status: "pending" | "success" | "failed";
    value: number;
    tax: number;
    category: {
      name: string;
    };
    historyVoucherTopup: {
      gameName: string;
      coinName: string;
      coinQuantity: string;
      thumbnail: string;
      price: number;
    };
    historyPayment: {
      name: string;
      bankName: string;
      noRekening: string;
      type: string;
    };
  };
}

export default function TransactionDetailContent({
  transactionDetail,
}: TransactionDetailContentProps) {
  const IMG_PATH = process.env.NEXT_PUBLIC_IMG;

  const dataItemDetail = {
    title: transactionDetail.historyVoucherTopup.gameName,
    category: transactionDetail.category.name,
    status: transactionDetail.status,
  };

  const dataPurchaseDetail = {
    gameID: transactionDetail.accountUser,
    gameItem: `${transactionDetail.historyVoucherTopup.coinQuantity} ${transactionDetail.historyVoucherTopup.coinName}`,
    price: transactionDetail.historyVoucherTopup.price,
    tax: transactionDetail.tax,
    value: transactionDetail.value,
  };

  const dataPaymentInformation = {
    name: transactionDetail.historyPayment.name,
    bankName: transactionDetail.historyPayment.bankName,
    noRekening: transactionDetail.historyPayment.noRekening,
    type: transactionDetail.historyPayment.type,
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Details #GG001
        </h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <ItemDetail data={dataItemDetail} />
              <hr />
              <PurchaseDetail data={dataPurchaseDetail} />
              <PaymentInformations data={dataPaymentInformation} />
              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  href="#"
                  role="button"
                >
                  WhatsApp ke Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
