import Image from "next/image";

export default function SignInIllustration() {
  return (
    <div className="col-xxl-7 col-lg-6 bg-blue text-center pt-lg-145 pb-lg-145 d-lg-block d-none">
      <Image
        src="/img/Header-9.png"
        width="502"
        height="391.21"
        className="img-fluid pb-50"
        alt=""
      />
      <h2 className="text-4xl fw-bold text-white mb-30">
        Win the battle.
        <br />
        Be the Champion.
      </h2>
      <p className="text-white m-0">
        Kami menyediakan jutaan cara untuk
        <br /> membantu players menjadi
        <br />
        pemenang sejati
      </p>
    </div>
  );
}
