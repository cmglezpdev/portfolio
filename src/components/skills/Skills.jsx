import { useState } from 'react';

import { NextJs, CPlusPlus, CSharp, Css, Django, Express, Firebase, GraphQL, Html, JavaScript, MongoDB, MySQL, NestJs, NodeJs, Python, React, Typescript, Sass, Redux, ReactNative, MaterialUI, Docker, Postgres, DotNet, Rust } from '../icons';
import { Title } from '../';
import './skills.scss';
import { FaDocker } from 'react-icons/fa';


export const Skills = () => {

    const [selected, setSelected] = useState(1);

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
                    className={selected === 1 ? 'active-section' : ''}
                    onClick={() => setSelected(1)}
                >Knowledge</div>
                <div 
                    className={selected === 2 ? 'active-section' : ''}
                    onClick={() => setSelected(2)}
                >I'm Learning</div>
                <div 
                    className={selected === 3 ? 'active-section' : ''}
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
            <NextJs />
            <NestJs />
            <Redux />
            <Sass />
            <MaterialUI />
            <Firebase />
            <NodeJs />
            <Express />
            <MongoDB />
            <Python />
            <CSharp />
            <CPlusPlus />
        </>
    )
}

const LearningSection = () => {
    return (
        <>
            <GraphQL />
            <Docker />
            <Postgres />
        </>
    )
}

const InterestedSection = () => {

    return (
        <>
            <Django />
            <ReactNative />
            <MySQL />
            <DotNet />
            <Rust />
        </>
    )

}