import { useEffect, useState } from 'react';
import cpp_colored from '../../props/icons/skills/cplusplus-colored.svg';
import cpp_dark from '../../props/icons/skills/cplusplus-dark.svg';
import cpp from '../../props/icons/skills/cplusplus.svg';

import './icons.scss';


export const CPlusPlus = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( cpp_colored );
        return;

      case 'dark':
        setIcon( cpp_dark );
        return;

      default:
        setIcon( cpp );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="CPlusPlus" />
        <span>C++</span>
    </div>
  )
}