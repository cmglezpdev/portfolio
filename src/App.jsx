import { Header,Menu, About, Skills, Work, Footer, ButtonsContainer, Contact } from "./components"

export const App = () => {


  return (
    <>
      <div id='app'>
        <Menu />
        <div className="container-general">
          <Header />
          <About />
          <Skills />
          <Work />
          <Contact />
          <Footer />
          <ButtonsContainer />
        </div>    
      </div>
    </>
    )
}
