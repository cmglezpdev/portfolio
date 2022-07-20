
import ReactTypingEffect from 'react-typing-effect';
import './header.scss';

import myPhoto from '../../props/me.jpg';

export const Header = () => {
  return (
    <div className='header' id='home'>
        <div className="header__grettings">
            
            <h1 className="header-gretting">
                <span>{"<br>"}</span>
                {"Hello"}
                <span>{"</br>"}</span>
            </h1>
            <h2 className='header-name'>{"I'm Carlos Manuel"}</h2>
            <h2 className='header-interests'>
                <ReactTypingEffect 
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={30}
                    eraseDelay={1500}
                    text={[
                    `Frontend Developer`,
                    `Backend Develper`,
                    `Competitive Programming`,
                    `Machine Learning`,
                    ]}
                />

            </h2>


            <p className='header-minidescription'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusamus cum hic dolor rerum ea nostrum sint et, est assumenda fugit, recusandae, quo nemo eligendi eveniet officia labore optio. Aut.
            </p>

        </div>
    </div>
  )
}
