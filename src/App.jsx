import { Header,Menu, About, Skills, Work, Footer } from "./components"

export const App = () => {


  return (
  
    <div id='app'>
      <div className="container-general">
        <Menu />
        <Header />
        <About />
        <Skills />
        <Work />
        <Footer />
      </div>
    </div>
  
  )
}
