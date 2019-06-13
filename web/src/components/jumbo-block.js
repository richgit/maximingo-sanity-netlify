import React from 'react'
import {Spring} from "react-spring";
import {responsiveTitle3} from "../components/typography.module.css";
import {cn} from '../lib/helpers'
import styles from "../components/article-preview-grid.module.css";

const JumboBlock = ({image, title, description}) => (

  <Spring
    from={{opacity: 0}}
    to={{opacity: 1}}
    config={{delay: 1000, duration: 2000}}
  >
    {props => (
      <div style={props}>
        <img className="py-4"
             src={image.asset.url}
             alt={title}
             width="100%"
        />
        <div className={cn(responsiveTitle3, styles.description)}>{description}</div>
      </div>
    )}
  </Spring>

)

export default JumboBlock
