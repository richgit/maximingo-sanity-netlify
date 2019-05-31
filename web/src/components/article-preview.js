import React from 'react'
import {buildImageObj, cn} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './article-preview-grid.module.css'
import {responsiveTitle3} from './typography.module.css'

function ArticlePreview (props) {
  console.log('props', props);
  return (
    <a className={styles.root} href={props.articleUrl}>
      <div className="card mb-3 bg-dark">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={imageUrlFor(buildImageObj(props.image))
                .width(100)
                .height(130)
                // .height(Math.floor((9 / 16) * 200))
                .url()}
              alt={props.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className={cn(responsiveTitle3, styles.title)}>{props.title}</h5>
              <p className="card-text">{props.description}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

    </a>
  )
}

export default ArticlePreview
