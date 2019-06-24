import React from 'react'
import {animated, useSpring} from "react-spring";
import {responsiveTitle3} from "../components/typography.module.css";
import {cn} from '../lib/helpers'
import styles from "../components/article-preview-grid.module.css";

function JumboBlock({image, title, description}) {
  const props = useSpring({opacity: 1, from: {opacity: 0}, delay: 400, config: { duration: 1500 }})
  return (
    <animated.div style={props}>
      <img className="py-4"
           src={image.asset.url}
           alt={title}
           width="100%"
      />
      <div className={cn(responsiveTitle3, styles.description)}>{description}</div>
    </animated.div>
  )
}

export default JumboBlock
