import { Analytics } from "@vercel/analytics/react"
import { Header,Menu, About, Skills, Work, Footer, ButtonsContainer, Contact, Job } from "./components"

export const App = () => {


  return (
    <>
      <Analytics />
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
