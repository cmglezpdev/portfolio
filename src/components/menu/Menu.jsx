
import './menu.scss'

export const Menu = () => {
    return (
        <div className="menu">
            <ul>
                <li className="item-menu">
                    <a href="#">Home</a>
                    <div className='line'></div>
                </li>
                <li className="item-menu">
                    <a href="#">About</a>
                    <div className='line'></div>
                </li>
                <li className="item-menu">
                    <a href="#">Skills</a>
                    <div className='line'></div>
                </li>
                <li className="item-menu">
                    <a href="#">Works</a>
                    <div className='line'></div>
                </li>
                <li className="item-menu">
                    <a href="#">Contact</a>
                    <div className='line'></div>
                </li>
            </ul>
        </div>  

    )
}
