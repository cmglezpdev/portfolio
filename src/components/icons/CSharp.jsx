import { useEffect, useState } from 'react';
import cs_colored from '../../props/icons/skills/csharp-colored.svg';
import cs_dark from '../../props/icons/skills/csharp-dark.svg';
import cs from '../../props/icons/skills/csharp.svg';

import './icons.scss';


export const CSharp = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( cs_colored );
        return;

      case 'dark':
        setIcon( cs_dark );
        return;

      default:
        setIcon( cs );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="CSharp" />
        <span>C#</span>
    </div>
  )
}