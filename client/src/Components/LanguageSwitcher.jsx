import React from 'react';
import { useTranslation } from 'react-i18next';
import './Languageswitcher.css'
import './i18n'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10 }}>
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en-us">English</option>
        <option value="sw">Swahili</option>
        <option value="kikuyu">Kikuyu</option>
        <option value="kalenjin">Kalenjin</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
