
import { AiFillCodepenCircle, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

import './buttonsocial.scss';


export const ButtonSocial = () => {
  return (
      <div className='button-social-media'>
        <div className="social">
          <a href='#'><AiFillGithub /></a>
          <a href='#'><AiFillTwitterCircle /></a>
          <a href='#'><AiFillCodepenCircle /></a>
          <a href='#'><AiFillLinkedin /></a>
        </div>
      <div className="vertical-line"></div>
    </div>
  )
}


