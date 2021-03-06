import Image from "next/image";
import cx from "classnames";
import Link from "next/link";

interface MenuItemProps {
  title: string;
  icon:
    | "icon-menu-overview"
    | "icon-menu-transaction"
    | "icon-menu-message"
    | "icon-menu-card"
    | "icon-menu-reward"
    | "icon-menu-setting"
    | "icon-menu-logout";
  active: boolean;
  href?: string;
  onClick?: () => void;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active = false, href = "/", onClick } = props;

  const classItem = cx({
    item: true,
    "mb-30": true,
    active: active,
  });

  return (
    <div className={classItem} onClick={onClick}>
      <div className="me-3">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} alt="logo" />
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <a className="text-lg text-decoration-none">{title}</a>
        ) : (
          <Link href={href}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
