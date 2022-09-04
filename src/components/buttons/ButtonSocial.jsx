
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

import './buttonsocial.scss';


export const ButtonSocial = () => {
  return (
      <div className='button-social-media'>
        <div className="social">
          <a href='https://github.com/cmglezpdev' target={"_blank"} rel="noreferrer"><AiFillGithub /></a>
          <a href='https://twitter.com/cmglezpdev' target={"_blank"} rel="noreferrer"><AiFillTwitterCircle /></a>
          <a href='https://www.linkedin.com/in/carlos-manuel-gonzalez-pe%C3%B1a-2b8a92245/' target={"_blank"} rel="noreferrer"><AiFillLinkedin /></a>
        </div>
      <div className="vertical-line"></div>
    </div>
  )
}


