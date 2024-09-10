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

const Navbar = ({ handleInputChange, handleKeyDown, searchInput }) => {
  const { t } = useTranslation();
  const [scrollPage, setScrollPage] = useState(false);

  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixedNavbar);

  return (
    <nav>
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

      <div className={scrollPage ? " main-nav fixed" : "main-nav"}>
        <ul>
          <Link to="/">
            <li>{t("Home")}</li>
          </Link>
          <Link to="/about">
            <li>{t("About")}</li>
          </Link>
          <Link to="/gaps">
            <li>{t("Gaps By Value Chain")}</li>
          </Link>
          <Link to="/Contact">
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
    </nav>
  );
};

export default Navbar;
