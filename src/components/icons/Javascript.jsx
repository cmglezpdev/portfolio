
import { useEffect, useState } from 'react';
import js_colored from '../../props/icons/skills/javascript-colored.svg';
import js_dark from '../../props/icons/skills/javascript-dark.svg';
import js from '../../props/icons/skills/javascript.svg';

import './icons.scss';


export const JavaScript = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( js_colored );
        return;

      case 'dark':
        setIcon( js_dark );
        return;

      default:
        setIcon( js );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="javascript" />
        <span>Javascript</span>
    </div>
  )
}



