import { useEffect, useState } from "react";
import  axios  from 'axios'

import './Produtos.css'
import BotaoExcluir from "../BotaoExcluir";

export default function Produtos({onExcluirProduto}){
    const [ produtos, setProdutos] = useState([])

    useEffect(() => {
        getProdutos()
    }, [])

    async function getProdutos(){
        try {
            const response = await axios.get("http://localhost:8800/produtos");
            setProdutos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    } 

    return (
       
        <div className="produtos">
            <table>
                <thead>
                    <tr>
                        <th>Código de Produto</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {produtos.map(produto => (
                        
                        <tr key={produto.codigo_do_produto}>
                            <td>{produto.codigo_do_produto}</td>
                            <td>{produto.nomde_do_produto}</td>
                            <td>{produto.descricao_do_produto}</td>
                            <td>{produto.preco.toFixed(2)}</td>
                            <td>
                                <BotaoExcluir codigoDoProduto={produto.codigo_do_produto}
                                onExcluir={onExcluirProduto}
                                /></td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>

            
            
        </div>

    )
}