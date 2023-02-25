import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="header">
        <ul className="header__menu">
          <li>
            <NavLink className="header__menu-link" to="/">О приложении</NavLink>
          </li>
          <li>
            <NavLink className="header__menu-link" to="/quotes">Котировки</NavLink>
          </li>
        </ul>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">2023</footer>
    </>
  );
};

export { Layout };
