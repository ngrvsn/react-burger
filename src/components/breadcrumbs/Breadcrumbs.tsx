import { Link, useLocation } from "react-router-dom";
import { FC } from "react";

import styles from "./Breadcrumbs.module.scss";

const breadcrumbNames: { [key: string]: string } = {
  profile: "Профиль",
  orders: "История заказов",
  connectus: "Напишите нам",
};

const Breadcrumb: FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((e) => e);

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;

    return (
      <span key={to} className={styles.breadcrumb}>
        {isLast ? (
          breadcrumbNames[value] || value
        ) : (
          <Link to={to} className={styles.link}>
            {breadcrumbNames[value] || value}
          </Link>
        )}
        {!isLast && " > "}
      </span>
    );
  });

  return <nav className={styles.breadcrumbs}>{breadcrumbs}</nav>;
};

export default Breadcrumb;
