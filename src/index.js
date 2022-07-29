import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.scss'

const root = createRoot( document.querySelector('#root') );

root.render( <App /> );

const handleChangeActive = ( linkref ) => {

    const currentNav = document.querySelector( `[linkref="${linkref}"]` ); // los cuadraditos
    const currentMenu = document.querySelector( `[linkref-menu="${linkref}"]` ); // el menu

    if( !currentNav.classList.contains("active-position") ) {
        const active = document.querySelector(".active-position");
        if(active != undefined)  active.classList.remove("active-position");
        currentNav.classList.add("active-position");
    }

    if( !currentMenu.classList.contains("active-nav") ) {
        const active = document.querySelector('.active-nav');
        if( active != undefined ) active.classList.remove("active-nav");
        currentMenu.classList.add('active-nav');
    }
}

const actions = () => {

    const marginTop = 220;
    const home = document.querySelector("#app");
    const about = document.querySelector("#about");
    const skills = document.querySelector("#skills");
    const works = document.querySelector("#works");
    const contact = document.querySelector("#contact");

    const positionHome = home.getBoundingClientRect().top;
    const positionAbout = about.getBoundingClientRect().top;
    const positionSkills = skills.getBoundingClientRect().top;
    const positionWorks = works.getBoundingClientRect().top;
    const positionContact = contact.getBoundingClientRect().top;

    if( positionHome == 0 ) {
        handleChangeActive("home")
    }

    if( 0 <= positionAbout && positionAbout <= marginTop ) {
        handleChangeActive("about")
    } 
    if( 0 <= positionSkills && positionSkills <= marginTop ) {
        handleChangeActive("skills")
    } 

    if( 0 <= positionWorks && positionWorks <= marginTop ) {
        handleChangeActive("works")
    }
    
    if( 0 <= positionContact && positionContact <= marginTop ) {
        handleChangeActive("contact")
    }

}



window.addEventListener("load", () => {

    actions();

    window.addEventListener("scroll", () => {
        actions();
    });
})