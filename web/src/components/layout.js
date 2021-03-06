import React from 'react'
import Header from './header'
import Headroom from "react-headroom";
import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, navImage}) => (
  <>
    {/*<Headroom>*/}
    {/*  <Header siteTitle={siteTitle} navImage={navImage} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />*/}
    {/*</Headroom>*/}
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © Maximingo {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a> &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </footer>
  </>
)

export default Layout
