import Image from "next/image";

interface TopUpItemProps {
  title: string;
  type: string;
  spent: number;
  icon: "icon-topup-desktop" | "icon-topup-mobile";
}

export default function TopUpItem(props: TopUpItemProps) {
  const { title, type, icon, spent } = props;

  return (
    <div className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4">
      <div className="categories-card">
        <div className="d-flex align-items-center mb-24">
          <Image src={`/icon/${icon}.svg`} width={60} height={60} alt="" />
          <p className="color-palette-1 mb-0 ms-12">
            {title}
            <br /> {type}
          </p>
        </div>
        <div>
          <p className="text-sm color-palette-2 mb-1">Total Spent</p>
          <p className="text-2xl color-palette-1 fw-medium m-0">Rp {spent}</p>
        </div>
      </div>
    </div>
  );
}
