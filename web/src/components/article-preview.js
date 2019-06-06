import React from 'react'
import {buildImageObj, cn} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'

import styles from './article-preview-grid.module.css'
import {responsiveTitle3} from './typography.module.css'
import {differenceInDays, distanceInWords, format} from "date-fns";

function ArticlePreview (props) {
  console.log('props', props);
  return (
    <a className={styles.root} href={props.articleUrl}>
      <div className="card bg-dark">
        <div className="row ">
          <div className="col-12 col-sm-4">
            <img className="d-none d-sm-block"
              src={imageUrlFor(buildImageObj(props.image))
                .width(100)
                .height(130)
                // .height(Math.floor((9 / 16) * 200))
                .url()}
              alt={props.title}
            />
            <img className="d-block d-sm-none"
              src={imageUrlFor(buildImageObj(props.image))
                .width(400)
                .height(130)
                // .height(Math.floor((9 / 16) * 200))
                .url()}
              alt={props.title}
            />

            <p className="card-text mt-2">
              <small className="text-muted">
                {differenceInDays(new Date(props.publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(props.publishedAt), new Date())
                  : format(new Date(props.publishedAt), 'MMMM Do YYYY')}
              </small>
            </p>

            {props.categories &&
            props.categories.map(category => (
              <p key={category.id}>
                <span className="badge badge-light">{category.title}</span>
              </p>
            ))}

          </div>
          <div className="col-sm-8">
            <div className="card-block">

              <h4 className="card-title"><div className={cn(responsiveTitle3, styles.title)}>{props.title}</div></h4>
              <p className="card-text">{props.description}</p>

            </div>
          </div>

        </div>
      </div>
    </a>
  )
}

export default ArticlePreview
