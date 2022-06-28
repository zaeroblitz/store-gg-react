import TopUpItem from "./TopUpCategoryItem";

export default function TopUpCategory() {
  return (
    <div className="top-up-categories mb-30">
      <p className="text-lg fw-medium color-palette-1 mb-14">
        Top Up Categories
      </p>
      <div className="main-content">
        <div className="row">
          <TopUpItem
            title="Game"
            icon="icon-topup-desktop"
            type="Desktop"
            spent={10000}
          />
          <TopUpItem
            title="Voucher"
            icon="icon-topup-mobile"
            type="Mobile"
            spent={50000}
          />
          <TopUpItem
            title="Battle Pass"
            icon="icon-topup-desktop"
            type="Other"
            spent={50000}
          />
        </div>
      </div>
    </div>
  );
}
