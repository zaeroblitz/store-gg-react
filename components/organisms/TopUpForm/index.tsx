import { useRouter } from "next/router";
import { useState } from "react";
import {
  BankTypes,
  NominalTypes,
  PaymentTypes,
} from "../../../services/data-types";
import NominalItem from "./NominalItem";
import PaymentItem from "./PaymentItem";
import { toast } from "react-toastify";

interface TopUpFormProps {
  nominals: NominalTypes[];
  payments: PaymentTypes[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const router = useRouter();
  const { nominals, payments } = props;
  const [verifyID, setVerifyID] = useState("");
  const [nominalItem, setNominalItem] = useState({});
  const [paymentItem, setPaymentItem] = useState({});
  const [bankAccountName, setBankAccountName] = useState("");

  const onNominalChange = (data: NominalTypes) => {
    setNominalItem(data);
  };

  const onPaymentChange = (payment: PaymentTypes, bank: BankTypes) => {
    const data = {
      payment,
      bank,
    };

    setPaymentItem(data);
  };

  const onSubmit = () => {
    if (
      verifyID === "" ||
      nominalItem === {} ||
      paymentItem === {} ||
      bankAccountName === ""
    ) {
      toast.error("Mohon lengkapi data topup terlebih dahulu");
    } else {
      const data = {
        verifyID,
        nominalItem,
        paymentItem,
        bankAccountName,
      };

      localStorage.setItem("data-topup", JSON.stringify(data));
      router.push("/checkout");
    }
  };

  const renderedNominalItem = () => {
    return nominals.map((nominal) => (
      <NominalItem
        key={nominal._id}
        id={nominal._id}
        coinName={nominal.coinName}
        coinQuantity={nominal.coinQuantity}
        price={nominal.price}
        onChange={() => onNominalChange(nominal)}
      />
    ));
  };

  const renderedPaymentItem = () => {
    return payments.map((payment) => {
      return payment.banks.map((bank) => (
        <PaymentItem
          key={bank._id}
          bankID={bank._id}
          type={payment.type}
          bankName={bank.bankName}
          onChange={() => onPaymentChange(payment, bank)}
        />
      ));
    });
  };

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(event) => setVerifyID(event.target.value)}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {renderedNominalItem()}
          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {renderedPaymentItem()}
            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(event) => setBankAccountName(event.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
