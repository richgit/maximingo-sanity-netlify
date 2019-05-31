import {Link} from 'gatsby'
import React from 'react'

import styles from './article-preview-grid.module.css'
import ArticlePreview from "./article-preview";

function articlePreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
        {props.nodes &&
          props.nodes.map(node => (
            <div key={node.id}>
              <ArticlePreview {...node} />
            </div>
          ))}
      )}
    </div>
  )
}

articlePreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default articlePreviewGrid
