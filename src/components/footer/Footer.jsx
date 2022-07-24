
import { AiFillGithub, AiFillTwitterCircle, AiFillCodepenCircle, AiFillLinkedin } from 'react-icons/ai';

import './footer.scss'

export const Footer = () => {
  return (
    <footer className="footer-container">
        <span className="copyright">© 2022 - Built by Carlos Manuel</span>

        <div className="social">
            <a href='#'><AiFillGithub /></a>
            <a href='#'><AiFillTwitterCircle /></a>
            <a href='#'><AiFillCodepenCircle /></a>
            <a href='#'><AiFillLinkedin /></a>
        </div>
    </footer>
  )
}
