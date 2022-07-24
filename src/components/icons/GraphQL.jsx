import { useEffect, useState } from 'react';
import graphqp_colored from '../../props/icons/skills/graphql-colored.svg';
import graphqp_dark from '../../props/icons/skills/graphql-dark.svg';
import graphqp from '../../props/icons/skills/graphql.svg';

import './icons.scss';


export const GraphQL = ({ theme }) => {

  const [icon, setIcon] = useState("");

  useEffect(() => {

    switch( theme ) {
      case 'colored':
        setIcon( graphqp_colored );
        return;

      case 'dark':
        setIcon( graphqp_dark );
        return;

      default:
        setIcon( graphqp );
        return;
    }

  }, [theme])


  return (
    <div className='icon'>
        <img src={icon} alt="GraphQL" />
        <span>GraphQL</span>
    </div>
  )
}