import { useEffect, useState } from 'react';
import nest_colored from '../../props/icons/skills/nestjs-colored.svg';
import nest_dark from '../../props/icons/skills/nestjs-dark.svg';
import nest from '../../props/icons/skills/nestjs.svg';

import './icons.scss';


export const NestJs = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( nest_colored );
        return;

      case 'dark':
        setIcon( nest_dark );
        return;

      default:
        setIcon( nest );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="NestJs" />
        <span>NestJs</span>
    </div>
  )
}