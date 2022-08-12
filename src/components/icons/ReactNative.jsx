import { useEffect, useState } from 'react';
import react_colored from '../../props/icons/skills/react-colored.svg';
import react_dark from '../../props/icons/skills/react-dark.svg';
import react from '../../props/icons/skills/react.svg';

import './icons.scss';


export const ReactNative = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( react_colored );
        return;

      case 'dark':
        setIcon( react_dark );
        return;

      default:
        setIcon( react );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="ReactNative" />
        <span>React Native</span>
    </div>
  )
}