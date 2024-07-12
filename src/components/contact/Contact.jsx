import { Title } from '../';

import './contact.scss';

export const Contact = () => {

  return (
    <div className='contact-container' id='contact'>

      <Title text={"Contact"}/>

      <p className='contact-text'>I am open to new projects and job offers. If you are interested in my work and would like to collaborate, or if you have any inquiries, feel free to contact me at <a href='maito:cmglezpdev@gmail.com'>cmglezpdev@gmail.com</a>.</p>
    </div>
  )
}
