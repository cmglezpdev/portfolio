import { useState } from 'react';

import { NextJs, CPlusPlus, CSharp, Css, Django, Express, Firebase, GraphQL, Html, JavaScript, MongoDB, MySQL, NestJs, NodeJs, Python, React, Typescript } from '../icons';
import { Title } from '../';
import './skills.scss';


export const Skills = () => {

    const [selected, setSelected] = useState(1);
    const [theme, setTheme] = useState("");

    const selectedIcons = () => {
        switch( selected ) {
            case 1:
                return <StrongSection />
            case 2:
                return <LearningSection />
            case 3:
                return <InterestedSection />
            default:
                return;
        }
    }


    return (
        <div className='skills-container' id='skills'>
            <Title text={"Skills"} />

            <div className='select-skills'>
                <div 
                    className={selected == 1 ? 'active-section' : ''}
                    onClick={() => setSelected(1)}
                >Strong</div>
                <div 
                    className={selected == 2 ? 'active-section' : ''}
                    onClick={() => setSelected(2)}
                >I'm Learning</div>
                <div 
                    className={selected == 3 ? 'active-section' : ''}
                    onClick={() => setSelected(3)}
                >I'm Interested</div>
            </div>

            <div className='skill-icons'>
                { selectedIcons() }
            </div>
        </div>
    )
}


const StrongSection = () => {
    return (
        <>
            <Html />
            <Css />
            <JavaScript />
            <Typescript />
            <React />
            <CSharp />
            <CPlusPlus />
        </>
    )
}

const LearningSection = () => {
    return (
        <>
            <Firebase />
            <NodeJs />
            <Express />
            <MongoDB />
        </>
    )
}

const InterestedSection = () => {

    return (
        <>
            <Python />
            <NestJs />
            <NextJs />
            <GraphQL />
            <MySQL />
        </>
    )

}