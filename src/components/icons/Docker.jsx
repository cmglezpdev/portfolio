import { FaDocker } from 'react-icons/fa';
import LazyLoad from 'react-lazy-load';
import './icons.scss';

export const Docker = () => {

  return (
    <div className='icon'>
      <LazyLoad>
        <FaDocker className='react-icon' />
      </LazyLoad>
      <span>Docker</span>
    </div>
  )
}