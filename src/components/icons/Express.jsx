import { useEffect, useState } from 'react';
import express_colored from '../../props/icons/skills/express-colored.svg';
import express_dark from '../../props/icons/skills/express-dark.svg';
import express from '../../props/icons/skills/express.svg';

import './icons.scss';


export const Express = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( express_colored );
        return;

      case 'dark':
        setIcon( express_dark );
        return;

      default:
        setIcon( express );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Express" />
        <span>Express</span>
    </div>
  )
}