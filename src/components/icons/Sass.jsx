import { useEffect, useState } from 'react';
import sass_colored from '../../props/icons/skills/sass-colored.svg';
import sass_dark from '../../props/icons/skills/sass-dark.svg';
import sass from '../../props/icons/skills/sass.svg';

import './icons.scss';


export const Sass = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( sass_colored );
        return;

      case 'dark':
        setIcon( sass_dark );
        return;

      default:
        setIcon( sass );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Sass" />
        <span>Sass</span>
    </div>
  )
}