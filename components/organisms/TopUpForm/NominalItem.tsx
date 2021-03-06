import NumberFormat from "react-number-format";

interface NominalItemProps {
  id: string;
  coinName: string;
  coinQuantity: number;
  price: number;
  onChange: () => void;
}

export default function NominalItem(props: NominalItemProps) {
  const { id, coinName, coinQuantity, price, onChange } = props;

  return (
    <label
      className="col-lg-4 col-sm-6 ps-md-15 pe-md-15 pt-md-15 pb-md-15 pt-10 pb-10"
      htmlFor={id}
      onChange={onChange}
    >
      <input className="d-none" type="radio" id={id} name="topup" value={id} />
      <div className="detail-card">
        <div className="d-flex justify-content-between">
          <p className="text-3xl color-palette-1 m-0">
            <p className="fw-medium mb-0">{coinQuantity} </p>
            {coinName}
          </p>
          <svg
            id="icon-check"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#CDF1FF" />
            <path
              d="M5.83301 10L8.46459 12.5L14.1663 7.5"
              stroke="#00BAFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-lg color-palette-1 m-0">
          {
            <NumberFormat
              value={price}
              prefix="Rp. "
              displayType="text"
              decimalSeparator=","
              thousandSeparator="."
            />
          }
        </p>
      </div>
    </label>
  );
}
