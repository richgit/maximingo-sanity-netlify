import React from 'react'
import {buildImageObj, cn} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './article-preview-grid.module.css'
import {responsiveTitle3} from './typography.module.css'

function ArticlePreview (props) {
  console.log('props', props)
  return (
    <a className={styles.root} href={props.articleUrl}>
      <div className={styles.leadMediaThumb}>
        {props.image && props.image.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.image))
              .width(200)
              .height(400)
              // .height(Math.floor((9 / 16) * 200))
              .url()}
            alt={props.title}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props.description && (
        <div className={styles.excerpt}>
          <div>{props.description}</div>
        </div>
      )}
    </a>
  )
}

export default ArticlePreview
