import { NavLink } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.logo}>
            <BiSolidCameraMovie size="36" className={css.logoIcon} />
          </NavLink>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
