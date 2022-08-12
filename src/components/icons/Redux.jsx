import { useEffect, useState } from 'react';
import redux_colored from '../../props/icons/skills/redux-colored.svg';
import redux_dark from '../../props/icons/skills/redux-dark.svg';
import redux from '../../props/icons/skills/redux.svg';

import './icons.scss';


export const Redux = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( redux_colored );
        return;

      case 'dark':
        setIcon( redux_dark );
        return;

      default:
        setIcon( redux );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Redux" />
        <span>Redux</span>
    </div>
  )
}