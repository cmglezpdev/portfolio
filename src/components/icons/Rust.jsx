import { FaRust } from 'react-icons/fa';
import LazyLoad from 'react-lazy-load';
import './icons.scss';

export const Rust = () => {

  return (
    <div className='icon'>
      <LazyLoad>
        <FaRust className='react-icon' />
      </LazyLoad>
      <span>Rust</span>
    </div>
  )
}