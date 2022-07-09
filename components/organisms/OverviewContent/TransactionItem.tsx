import Image from "next/image";
import cx from "classnames";
import NumberFormat from "react-number-format";

interface TransactionDataProps {
  title: string;
  category: string;
  item: string;
  price: number;
  status: "pending" | "success" | "failed";
  image: string;
}

export default function TransactionData(props: TransactionDataProps) {
  const { title, category, image, item, price, status } = props;
  const statusIndicatorClass = cx({
    "float-start": true,
    "icon-status": true,
    pending: status === "pending",
    success: status === "success",
    failed: status === "failed",
  });

  return (
    <tr className="align-middle">
      <th scope="row">
        <img
          className="float-start me-3 mb-lg-0 mb-3"
          src={image}
          width={80}
          height={60}
          alt=""
          style={{
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{item}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">
          <NumberFormat
            value={price}
            prefix="Rp "
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
          />
        </p>
      </td>
      <td>
        <div>
          <span className={statusIndicatorClass}></span>
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
}
