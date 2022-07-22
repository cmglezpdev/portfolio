import { useEffect, useState } from 'react';
import next_colored from '../../props/icons/skills/nextjs-colored.svg';
import next_dark from '../../props/icons/skills/nextjs-dark.svg';
import next from '../../props/icons/skills/nextjs.svg';

import './icons.scss';


export const NextJs = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( next_colored );
        return;

      case 'dark':
        setIcon( next_dark );
        return;

      default:
        setIcon( next );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="NextJs" />
        <span>NextJs</span>
    </div>
  )
}