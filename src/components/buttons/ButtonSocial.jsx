
import { AiFillCodepenCircle, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

import './buttonsocial.scss';


export const ButtonSocial = () => {
  return (
      <div className='button-social-media'>
        <div className="social">
          <a href='https://github.com/cmglezpdev' target={"_blank"}><AiFillGithub /></a>
          <a href='https://twitter.com/cmglezpdev' target={"_blank"}><AiFillTwitterCircle /></a>
          <a href='https://codepen.io/cmglezpdev' target={"_blank"}><AiFillCodepenCircle /></a>
          <a href='#' target={"_blank"}><AiFillLinkedin /></a>
        </div>
      <div className="vertical-line"></div>
    </div>
  )
}


