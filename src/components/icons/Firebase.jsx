import { useEffect, useState } from 'react';
import fb_colored from '../../props/icons/skills/firebase-colored.svg';
import fb_dark from '../../props/icons/skills/firebase-dark.svg';
import fb from '../../props/icons/skills/firebase.svg';

import './icons.scss';


export const Firebase = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( fb_colored );
        return;

      case 'dark':
        setIcon( fb_dark );
        return;

      default:
        setIcon( fb );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Firebase" />
        <span>Firebase</span>
    </div>
  )
}