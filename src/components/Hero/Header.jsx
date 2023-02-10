import React from 'react'
import styles from './styles.module.css'

const Header = (props) => {
    return (
        <div className={styles.header}>
            <h1><b>{props.title}</b></h1>
        </div>
    )
}

export default Header
