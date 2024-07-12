
import { AiFillGithub, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';

import './footer.scss'

export const Footer = () => {
  return (
    <footer className="footer-container">
        <span className="copyright">© {new Date().getFullYear()} - Built by Carlos Manuel</span>

        <div className="social">
            <a href='https://github.com/cmglezpdev' target="_blank" rel='noreferrer'><AiFillGithub /></a>
            <a href='https://twitter.com/cmglezpdev'  target="_blank" rel='noreferrer'><AiFillTwitterCircle /></a>
            <a href='https://linkedin.com/in/cmglezpdev'  target="_blank" rel='noreferrer'><AiFillLinkedin /></a>
        </div>
    </footer>
  )
}
