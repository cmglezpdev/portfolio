import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.scss'

const root = createRoot( document.querySelector('#root') );

root.render( <App /> );

// // const handleChangeActive = ( linkref ) => {

// //     const current = document.querySelector( `[linkref="${linkref}"]` ).children[0];

// //     if( current.classList.contains("active-nav") ) return;

// //     const active = document.querySelector(".icon.active-nav");
// //     active.classList.remove("active-nav");
// //     current.classList.add("active-nav");
// // }

// // window.addEventListener("load", () => {
// //     window.addEventListener("scroll", () => {
// //         const marginTop = 50;
// //         const home = document.querySelector("#home");
// //         const about = document.querySelector("#about");
// //         const projects = document.querySelector("#projects");

// //         const positionHome = home.getBoundingClientRect().top;
// //         const positionAbout = about.getBoundingClientRect().top;
// //         const positionProjects = projects.getBoundingClientRect().top;
        
// //         // console.log(positionHome);
// //         if( 0 <= positionHome && positionHome <= marginTop ) {
// //             handleChangeActive("home")
// //         }
        
// //         if( 0 <= positionAbout && positionAbout <= marginTop ) {
// //             handleChangeActive("about")
// //         } 
        
// //         if( 0 <= positionProjects && positionProjects <= marginTop ) {
// //             handleChangeActive("projects")
// //         }
// //     });
// })
