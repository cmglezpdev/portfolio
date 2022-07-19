
import './menu.scss'

import iconMenu from '../../props/menu.svg'
import iconClose from '../../props/close.svg'



export const Menu = () => {
    return (
        <nav className="nav container-nav" id="nav">
            <h2 className="nav__logo">TULOGO.</h2>
            
            <ul className='nav__links'>
                <li className="nav__item">
                    <a href="#" className='nav__link'>Home</a>
                </li>
                <li className="nav__item">
                    <a href="#" className='nav__link'>About</a>
                </li>
                <li className="nav__item">
                    <a href="#" className='nav__link'>Skills</a>
                </li>
                <li className="nav__item">
                    <a href="#" className='nav__link'>Works</a>
                </li>
                <li className="nav__item">
                    <a href="#" className='nav__link'>Contact</a>
                </li>
            </ul>

            <a href="#nav" className="nav__hamburguer">
                <img src={iconMenu} className="nav__icon" />
            </a>
            
            <a href="#" className="nav__close">
                <img src={iconClose} className="nav__icon" />
            </a>

    </nav>  

    )
}
