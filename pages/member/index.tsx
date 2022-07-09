import Sidebar from "../../components/organisms/Sidebar";
import OverviewContent from "../../components/organisms/OverviewContent";
import { JWTPayloadTypes, UserPayloadTypes } from "../../services/data-types";
import jwt_decode from "jwt-decode";

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent />
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
