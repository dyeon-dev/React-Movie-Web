import styles from "./btn.module.css"

import React from 'react'

export default function Button({text}) {
  return (
        <button className={styles.title}>{text}</button>
  )
}
