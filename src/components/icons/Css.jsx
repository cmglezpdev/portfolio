import { useEffect, useState } from 'react';
import css_colored from '../../props/icons/skills/css3-colored.svg';
import css_dark from '../../props/icons/skills/css3-dark.svg';
import css from '../../props/icons/skills/css3.svg';

import './icons.scss';


export const Css = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( css_colored );
        return;

      case 'dark':
        setIcon( css_dark );
        return;

      default:
        setIcon( css );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="CSS" />
        <span>CSS</span>
    </div>
  )
}