import { Header } from "./components/header/Header"
import { Menu } from "./components/menu/Menu"

export const App = () => {


  return (
  
    <div id='app'>
      <div className="container-general">
        <Menu />
        <Header />
      </div>
    </div>
  
  )
}
