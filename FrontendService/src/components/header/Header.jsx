import React from 'react';
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>

      <NavLink className={styles.Home} to="/">
      <div className={styles.Logo}>{props.Ai}</div>
        <div className={styles.Name}>{props.Name}</div>
      </NavLink>
      <NavLink className={styles.Info} to="/Info">
        {props.Info}
      </NavLink>
    </header>
  );
}

export default Header;