import LazyLoad from 'react-lazy-load';
import './icons.scss';

export const ClaudeAI = () => {
  return (
    <div className='icon'>
      <LazyLoad>
        <ClaudeAIIcon />
      </LazyLoad>
      <span>Claude AI</span>
    </div>
  )
}

const ClaudeAIIcon = props => <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512" width="1em" height="1em" {...props}><rect fill="#CC9B7A" width={512} height={512} rx={104.187} ry={105.042} /><path fill="#1F1F1E" fillRule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z" /></svg>;