import React from 'react'
import SEO from '../components/seo'
import styles from "../components/layout.module.css";

const NotFoundPage = () => (
  <div className={styles.content}>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <SEO title='404: Not found'/>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </footer>
  </div>

)

export default NotFoundPage
