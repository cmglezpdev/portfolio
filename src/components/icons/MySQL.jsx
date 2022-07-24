import { useEffect, useState } from 'react';
import mysql_colored from '../../props/icons/skills/mysql-colored.svg';
import mysql_dark from '../../props/icons/skills/mysql-dark.svg';
import mysql from '../../props/icons/skills/mysql.svg';

import './icons.scss';


export const MySQL = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( mysql_colored );
        return;

      case 'dark':
        setIcon( mysql_dark );
        return;

      default:
        setIcon( mysql );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="MySQL" />
        <span>MySQL</span>
    </div>
  )
}