import { Header,Menu, About, Skills } from "./components"

export const App = () => {


  return (
  
    <div id='app'>
      <div className="container-general">
        <Menu />
        <Header />
        <About />
        <Skills />
      </div>
    </div>
  
  )
}
