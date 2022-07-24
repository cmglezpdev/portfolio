import { Header,Menu, About, Skills, Work, Footer, ButtonsContainer } from "./components"

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
          <Footer />
          <ButtonsContainer />
        </div>    
      </div>
    </>
    )
}
