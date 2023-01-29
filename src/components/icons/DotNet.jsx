import { DiDotnet } from 'react-icons/di';
import LazyLoad from 'react-lazy-load';
import './icons.scss';

export const DotNet = () => {

  return (
    <div className='icon'>
      <LazyLoad>
        <DiDotnet className='react-icon' />
      </LazyLoad>
      <span>.Net</span>
    </div>
  )
}