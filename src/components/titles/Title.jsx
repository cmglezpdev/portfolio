
import './title.scss';

export const Title = ({ text }) => {
  return (
    <h2 className='title'>
        <span>{"<br>"}</span>
            { text } 
        <span>{"</br>"}</span>  
    </h2>
  )
}
