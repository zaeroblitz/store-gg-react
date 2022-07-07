import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Footer from "../../components/organisms/Footer";
import Navbar from "../../components/organisms/Navbar";
import TopUpForm from "../../components/organisms/TopUpForm";
import TopUpItem from "../../components/organisms/TopUpItem";
import { getVoucherDetail } from "../../services/player";

export default function Detail() {
  const { query, isReady } = useRouter();
  const [dataItem, setDataItem] = useState({
    name: "string",
    thumbnail: "string",
    category: {
      name: "",
    },
  });
  const [nominalItem, setNominalItem] = useState([]);
  const [paymentItem, setPaymentItem] = useState([]);

  const getVoucherDetailAPI = useCallback(async (id: any) => {
    const data = await getVoucherDetail(id);
    setDataItem(data.detail);
    setNominalItem(data.detail.nominals);
    setPaymentItem(data.payment);
  }, []);

  useEffect(() => {
    if (isReady) {
      getVoucherDetailAPI(query.id);
    }
  }, [isReady]);

  return (
    <>
      <Navbar />

      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem type="desktop" data={dataItem} />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              <TopUpItem type="mobile" data={dataItem} />
              <hr />
              <TopUpForm nominals={nominalItem} payments={paymentItem} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
