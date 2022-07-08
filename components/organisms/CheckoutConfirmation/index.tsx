import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";

export default function CheckoutConfirmation() {
  const router = useRouter();
  const [checkbox, setCheckbox] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!checkbox) {
      toast.error("Pastikan kamu sudah melakukan pembayaran");
    } else {
      const dataItemLocal = localStorage.getItem("data-item");
      const dataTopupLocal = localStorage.getItem("data-topup");

      const dataItem = JSON.parse(dataItemLocal!);
      const dataTopup = JSON.parse(dataTopupLocal!);

      const data = {
        accountUser: dataTopup.verifyID,
        name: dataTopup.bankAccoutName,
        nominal: dataTopup.nominalItem._id,
        voucher: dataItem._id,
        payment: dataTopup.paymentItem.payment._id,
        bank: dataTopup.paymentItem.bank._id,
      };

      const response = await setCheckout(data);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        toast.success("Berhasil melakukan checkout");
        setTimeout(() => {
          router.push("/complete-checkout");
        }, 1500);
      }
    }
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          role="button"
          type="button"
          onClick={(event) => onSubmit(event)}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
