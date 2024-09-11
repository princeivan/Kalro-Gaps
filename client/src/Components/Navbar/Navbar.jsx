import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar1 from "../../assets/navbar1.png";
import "./Navbar.css";
import { ImLocation } from "react-icons/im";
import { IoMailUnread } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ScrollProgressBar from "../ScrollProgressBar/ScrollProgressBar";
import { GlobalContext } from "../../Context/Context";
import Gaps from "../Gaps/Gaps";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const activeLink = ({ isActive }) => {
  isActive ? `active` : `notactive`;
};
const Navbar = ({ handleInputChange, handleKeyDown, searchInput }) => {
  const { t } = useTranslation();
  const [scrollPage, setScrollPage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState("");

  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixedNavbar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      {/* Top Navigation Section */}
      <div className="top-nav">
        <ul>
          <ImLocation style={{ alignContent: "center" }} />{" "}
          <li>
            {t("Our Location")} <span>KALRO, Kaptagat Rd</span>
          </li>
          <IoMailUnread />
          <li>
            {t("Mail Us")} <span>info@kalro.org</span>
          </li>
          <FaPhoneVolume />
          <li>
            {t("Contact Us")} <span>(+254) 0722 206 986</span>
          </li>
        </ul>
      </div>

      {/* Main Navigation */}
      <img src={Navbar1} alt="Kalro" className="logo" />
      <div className="centered">
        <h3 className="logo">
          Climate Resilient Good Agricultural Practices(GAPS)
        </h3>
        <h3 className="logo">GAPS for Selected Value Chain</h3>
      </div>
      <nav className={showMenu ? "show-nav" : "hide-nav"}>
        <div
          className={showMenu ? `nav-wrapper show-nav-wrapper` : `nav-wrapper`}
          onClick={hideMenu}
        >
          <div className={scrollPage ? " main-nav fixed" : "main-nav"}>
            <ul>
              <Link
                to="/"
                className={activeLink}
                onClick={() => setMenu("Home")}
              >
                <li>{t("Home")}</li>
              </Link>
              <Link
                to="/about"
                className={activeLink}
                onClick={() => setMenu("About")}
              >
                <li>{t("About")}</li>
              </Link>
              <Link
                to="/gaps"
                className={activeLink}
                onClick={() => setMenu("Gaps By Value Chain")}
              >
                <li>{t("Gaps By Value Chain")}</li>
              </Link>
              <Link
                to="/Contact"
                className={activeLink}
                onClick={() => setMenu("Contact")}
              >
                <li>{t("Contact")}</li>
              </Link>

              <li>
                <input
                  type="text"
                  placeholder="search Value Chain.."
                  value={searchInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="menu-icon">
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Navbar;
