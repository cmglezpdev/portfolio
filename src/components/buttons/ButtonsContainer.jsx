import { ButtonSocial } from "./ButtonSocial"
import { Progress } from "./Progress"


import './buttonscontainer.scss'

export const ButtonsContainer = () => {
    return (
      <div className='fixed'>
        <div className='relative'>
          <ButtonSocial />
          <Progress />
        </div>
      </div>
    )
}   
