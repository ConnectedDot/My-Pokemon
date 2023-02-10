import React, { useState } from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";


const Navigation = () => {
    const [expand, setExpand] = useState(false)

    const expandHandler = () => {
        setExpand(true)
    }
    const collapseHandler = () => {
        setExpand(false)
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.webNavGrid}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Pokemon" />
                    </Link>
                </div>
                <div className={styles.navToggle}>{expand ? <span onClick={collapseHandler}><FaTimes /></span> : <span onClick={expandHandler}><FaBars /></span>}</div>
                <div className={expand ? `${styles.navList}` : `${styles.navItems}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/myteam">My Team</Link></li>
                        <li><Link to="/pokemons">Pokemon</Link></li>

                    </ul>




                </div>

            </div>

        </div>
    )
}

export default Navigation
