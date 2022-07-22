import { useEffect, useState } from 'react';
import html_colored from '../../props/icons/skills/html5-colored.svg';
import html_dark from '../../props/icons/skills/html5-dark.svg';
import html from '../../props/icons/skills/html5.svg';

import './icons.scss';


export const Html = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( html_colored );
        return;

      case 'dark':
        setIcon( html_dark );
        return;

      default:
        setIcon( html );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="HTML" />
        <span>HTML</span>
    </div>
  )
}