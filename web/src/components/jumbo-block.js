import React from 'react'
import {Spring} from "react-spring";
import {responsiveTitle3} from "../components/typography.module.css";
import {cn} from '../lib/helpers'
import styles from "../components/article-preview-grid.module.css";
import {useSpring, animated} from 'react-spring'

function JumboBlock({image, title, description}) {
  const props = useSpring({opacity: 1, from: {opacity: 0}, delay: 300, config: { duration: 1000 }})
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
