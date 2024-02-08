import BotaoCadastrar from "./Componentes/BotaoCadastrar"
import MenuLateral from "./Componentes/MenuLateral"
import Produtos from "./Componentes/Produtos"



function App() {
  

  return (
    <>
     <MenuLateral />
     <Produtos />
     <BotaoCadastrar onCadastrar={BotaoCadastrar} />
    </>
  )
}

export default App
