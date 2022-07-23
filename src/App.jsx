import { Header,Menu, About, Skills, Work } from "./components"

export const App = () => {


  return (
  
    <div id='app'>
      <div className="container-general">
        <Menu />
        <Header />
        <About />
        <Skills />
        <Work />
      </div>
    </div>
  
  )
}
