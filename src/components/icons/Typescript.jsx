import { useEffect, useState } from 'react';
import ts_colored from '../../props/icons/skills/typescript-colored.svg';
import ts_dark from '../../props/icons/skills/typescript-dark.svg';
import ts from '../../props/icons/skills/typescript.svg';

import './icons.scss';


export const Typescript = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( ts_colored );
        return;

      case 'dark':
        setIcon( ts_dark );
        return;

      default:
        setIcon( ts );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Typescript" />
        <span>Typescript</span>
    </div>
  )
}