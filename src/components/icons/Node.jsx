import { useEffect, useState } from 'react';
import node_colored from '../../props/icons/skills/nodejs-colored.svg';
import node_dark from '../../props/icons/skills/nodejs-dark.svg';
import node from '../../props/icons/skills/nodejs.svg';

import './icons.scss';


export const NodeJs = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( node_colored );
        return;

      case 'dark':
        setIcon( node_dark );
        return;

      default:
        setIcon( node );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="NodeJs" />
        <span>NodeJs</span>
    </div>
  )
}