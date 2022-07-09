import Image from "next/image";

import CheckoutItem from "../../components/organisms/CheckoutItem";
import CheckoutDetail from "../../components/organisms/CheckoutDetail";
import CheckoutConfirmation from "../../components/organisms/CheckoutConfirmation";
import Link from "next/link";
import { JWTPayloadTypes, UserPayloadTypes } from "../../services/data-types";
import jwt_decode from "jwt-decode";

interface CheckoutProps {
  user: UserPayloadTypes;
}

export default function Checkout(props: CheckoutProps) {
  const { user } = props;

  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <Link href="/">
            <a className="">
              <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckoutItem />
        <hr />
        <CheckoutDetail />
        <CheckoutConfirmation />
      </div>
    </section>
  );
}

interface GetServerSideTypes {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideTypes) {
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

  return {
    props: {
      user: player,
    },
  };
}
