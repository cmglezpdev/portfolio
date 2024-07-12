
import './progress.scss';

export const Progress = () => {
  return (
    <div className='progress'>
      
      <div className="squares">
        <a href='#app'><div className="square" linkref="home"></div></a>
        <a href='#works'><div className="square" linkref="works"></div></a>
        <a href='#skills'><div className="square" linkref="skills"></div></a>
        <a href='#about'><div className="square" linkref="about"></div></a>
        <a href='#contact'><div className="square" linkref="contact"></div></a>
      </div>

      <div className="vertical-line"></div>

    </div>
  )
}
