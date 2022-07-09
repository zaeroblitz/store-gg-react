import Sidebar from "../../../components/organisms/Sidebar";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import {
  JWTPayloadTypes,
  UserPayloadTypes,
} from "../../../services/data-types";
import jwt_decode from "jwt-decode";
import { getMemberTransactionDetail } from "../../../services/member";

export default function TransactionsDetail({ transactionDetail }) {
  console.log("detail => ", transactionDetail);

  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionDetailContent transactionDetail={transactionDetail} />
    </section>
  );
}

interface GetServerSideTypes {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideTypes) {
  const { idTrx } = params;
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwt = Buffer.from(token, "base64").toString("ascii");
  const jwt_payload: JWTPayloadTypes = jwt_decode(jwt);
  const player: UserPayloadTypes = jwt_payload.player;
  const IMG_PATH = process.env.NEXT_PUBLIC_IMG;
  player.avatar = `${IMG_PATH}/${player.avatar}`;
  const response = await getMemberTransactionDetail(idTrx, jwt);

  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
