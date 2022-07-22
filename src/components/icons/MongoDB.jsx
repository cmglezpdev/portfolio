import { useEffect, useState } from 'react';
import mongo_colored from '../../props/icons/skills/mongodb-colored.svg';
import mongo_dark from '../../props/icons/skills/mongodb-dark.svg';
import mongo from '../../props/icons/skills/mongodb.svg';

import './icons.scss';


export const MongoDB = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( mongo_colored );
        return;

      case 'dark':
        setIcon( mongo_dark );
        return;

      default:
        setIcon( mongo );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="MongoDB" />
        <span>MongoDB</span>
    </div>
  )
}