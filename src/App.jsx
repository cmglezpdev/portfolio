import { About } from "./components"
import { Header } from "./components"
import { Menu } from "./components"

export const App = () => {


  return (
  
    <div id='app'>
      <div className="container-general">
        <Menu />
        <Header />
        <About />
      </div>
    </div>
  
  )
}
