import { Header,Menu, About, Skills, Work, Footer, ButtonsContainer, Contact, Job } from "./components"

export const App = () => {


  return (
    <>
      <div id='app'>
        <Menu />
        <div className="container-general">
          <Header />
          <Job />
          <Skills />
          {/* <Work /> */}
          <About />
          <Contact />
          <Footer />
          <ButtonsContainer />
        </div>    
      </div>
    </>
    )
}
