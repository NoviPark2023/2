import React from 'react';
import style from './Scroll.module.css';

function Scroll({ children }) {
  return <div className={style.skrol}>{children}</div>;
}

export default Scroll;
