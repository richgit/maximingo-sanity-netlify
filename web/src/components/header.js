import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'

import styles from './header.module.css'

const Header = ({onHideNav, onShowNav, showNav, siteTitle, navbarImage}) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.branding}>
        <img
          src={navbarImage.asset.url}
          alt={siteTitle}
          height='35px'
        />
      </div>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav id='scrollable-navbar' className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <a href='#articles'>Articles</a>
          </li>
          <li>
            <a href='#contact'>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
