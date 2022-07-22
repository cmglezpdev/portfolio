import { useEffect, useState } from 'react';
import py_colored from '../../props/icons/skills/python-colored.svg';
import py_dark from '../../props/icons/skills/python-dark.svg';
import py from '../../props/icons/skills/python.svg';

import './icons.scss';


export const Python = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( py_colored );
        return;

      case 'dark':
        setIcon( py_dark );
        return;

      default:
        setIcon( py );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Python" />
        <span>Python</span>
    </div>
  )
}