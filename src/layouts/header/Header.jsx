
import { useState } from 'react';
import { Menu } from '../../components/menu/Menu';
import './header.scss';


export const Header = () => {
    const [navBarOpen, setnavBarOpen] = useState(false);

    return (
      <>
        <nav className="header">
            <div className="header__logo">
                <h1>React</h1>
            </div>
        </nav>

        <Menu />
    </>
  )
}
