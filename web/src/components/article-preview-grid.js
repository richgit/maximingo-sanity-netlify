import React from 'react'

import styles from './article-preview-grid.module.css'
import ArticlePreview from "./article-preview";
import {Flip} from "react-reveal";

function articlePreviewGrid(props) {
  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      {props.nodes &&
      props.nodes.map(node => (
        <Flip left>
          <div className={styles.box} key={node.id}>
            <ArticlePreview {...node} />
          </div>
        </Flip>
      ))}
    </div>
  )
}

articlePreviewGrid.defaultProps = {
  title: '',
  nodes: [],
}

export default articlePreviewGrid
