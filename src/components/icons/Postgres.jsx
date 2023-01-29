import { SiPostgresql } from 'react-icons/si';
import LazyLoad from 'react-lazy-load';
import './icons.scss';

export const Postgres = () => {

  return (
    <div className='icon'>
      <LazyLoad>
        <SiPostgresql className='react-icon' />
      </LazyLoad>
      <span>Postgres</span>
    </div>
  )
}