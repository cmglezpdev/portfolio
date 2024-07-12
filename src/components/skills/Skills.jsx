import { useState } from 'react';

import { 
    NextJs, CPlusPlus, 
    CSharp, GraphQL, 
    JavaScript, MongoDB, MySQL, 
    NestJs, NodeJs, Python, React, 
    Typescript, Docker, Postgres, 
    DotNet, AmazonWebServices, Supabase, 
    OpenAI, ClaudeAI, HuggingFace
} from '../icons';
import { Title } from '../';
import './skills.scss';


export const Skills = () => {

    const [selected, setSelected] = useState(1);

    const selectedIcons = () => {
        switch( selected ) {
            case 1:
                return <StrongSection />
            case 2:
                return <LearningSection />
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
                >Learning</div>
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
            <JavaScript />
            <Typescript />
            <React />
            <NextJs />
            <NestJs />
            <NodeJs />
            <MongoDB />
            <Python />
            <CSharp />
            <CPlusPlus />
            <GraphQL />
            <Docker />
            <MySQL />
            <DotNet />
            <Postgres />
            <Supabase />
            <OpenAI />
            <ClaudeAI />
        </>
    )
}

const LearningSection = () => {
    return (
        <>
            {/* <HuggingFace /> */}
            <AmazonWebServices />
        </>
    )
}
