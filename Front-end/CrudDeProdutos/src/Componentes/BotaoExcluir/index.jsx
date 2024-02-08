import axios from "axios"


export default function BotaoExcluir({codigoDoProduto, onExcluir }){
    
        const botaoExcluir = async () => {
            try {
                await axios.delete(`http://localhost:8800/produtos/${codigoDoProduto}`)
                onExcluir()
                console.log(`Produto com código ${codigoDoProduto} excluído com sucesso!`)
            } catch (error) {
                console.error(`Erro ao excluir produto com ${codigoDoProduto}`, error.message)
            }
        }

        return (
            <button onClick={botaoExcluir}>Excluir</button>
        )

    
}