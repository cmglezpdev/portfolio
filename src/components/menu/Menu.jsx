
import './menu.scss'

import iconMenu from '../../props/menu.svg'
import iconClose from '../../props/close.svg'



export const Menu = () => {
    return (

        <nav className="nav container-nav" id="nav">
            <div className="nav__logo">
                <span>{ "{" }</span> <h2>{"cmglezpdev"}</h2><span>{"}"}</span>
            </div>
            
            <ul className='nav__links'>
                <li className="nav__item" linkref-menu="home">
                    <a href="#app" className='nav__link'>Home</a>
                    <div className="underline"></div>
                </li>
                <li className="nav__item" linkref-menu="about">
                    <a href="#about" className='nav__link'>About</a>
                    <div className="underline"></div>
                </li>
                <li className="nav__item" linkref-menu="skills">
                    <a href="#skills" className='nav__link'>Skills</a>
                    <div className="underline"></div>
                </li>
                <li className="nav__item" linkref-menu="works">
                    <a href="#works" className='nav__link'>Works</a>
                    <div className="underline"></div>
                </li>
                <li className="nav__item" linkref-menu="contact">
                    <a href="#contact" className='nav__link'>Contact</a>
                    <div className="underline"></div>
                </li>
            </ul>

            <a href="#nav" className="nav__hamburguer">
                <img src={iconMenu} className="nav__icon" alt='' />
            </a>
            
            <a href="#other" className="nav__close">
                <img src={iconClose} className="nav__icon" alt='' />
            </a>

    </nav>  

    )
}
