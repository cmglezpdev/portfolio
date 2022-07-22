import { useEffect, useState } from 'react';
import django_colored from '../../props/icons/skills/django-colored.svg';
import django_dark from '../../props/icons/skills/django-dark.svg';
import django from '../../props/icons/skills/django.svg';

import './icons.scss';


export const Django = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( django_colored );
        return;

      case 'dark':
        setIcon( django_dark );
        return;

      default:
        setIcon( django );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="Django" />
        <span>Django</span>
    </div>
  )
}