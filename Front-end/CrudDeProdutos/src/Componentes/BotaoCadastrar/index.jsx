import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import axios from "axios";


export default function BotaoCadastrar({ onCadastrar }) {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [produto, setProdutos] = useState([])

    const atualizaNome = (evento) => setNome(evento.target.value)
    const atualizaDescricao = (evento) => setDescricao(evento.target.value)
    const atualizaPreco = (evento) => setPreco(evento.target.value)

    const envioDoFormulario = async (evento) => {
        evento.preventDefault();

        try {
            const dadosCadastro = {
                nomde_do_produto: nome,
                descricao_do_produto: descricao,
                preco: preco
            };
    
            const resposta = await enviarDadosParaBackend(dadosCadastro);
    
            if (resposta && resposta.success) {
                onCadastrar();

                const dadosIniciais = await obterDadosDoBackend();
                setProdutos(dadosIniciais);

                alert('Produto cadastrado com sucesso!');
            } else {
                alert('Não foi possível fazer o cadastro. Verifique os dados e tente novamente.');
            }
    
            setNome('');
            setDescricao('');
            setPreco('');
    
            console.log('Resposta do backend:', resposta);
        } catch (erro) {
            console.error('Erro no envio do formulário:', erro.message);
           
        }
    }

    const enviarDadosParaBackend = async (dados) => {
        try {
            const resposta = await axios.post('http://localhost:8800/produtos', dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
                
        })

        if (resposta.data && resposta.data.message === "Produto foi criado com sucesso!") {
            return { success: true, message: resposta.data.message };
            
        } else {
            console.error('Resposta do servidor não possui a estrutura esperada:', resposta.data);
            throw new Error('Resposta inválida do servidor');
        }

    } catch (erro) {
        console.error('Erro ao enviar dados para o backend:', erro)
        throw erro
    }

    }

    const obterDadosDoBackend = async () => {
        try {
            const resposta = await fetch('http://localhost:8800/produtos')
            const dadosJson = await resposta.json()
            return dadosJson
        } catch (erro) {
            console.error('Erro ao obter dados do backend:', erro)
        }
    }

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            const dadosIniciais = await obterDadosDoBackend()
            setProdutos((prevProdutos) => [...prevProdutos, dadosIniciais]);
        }

        carregarDadosIniciais()
    }, [])

    BotaoCadastrar.propTypes = {
        onCadastrar: PropTypes.func.isRequired, 
    };



    return (
        <div>
            <form onSubmit={envioDoFormulario}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" value={nome} onChange={atualizaNome} />

                <label htmlFor="descricao">Descrição:</label>
                <input type="text" id="descricao" value={descricao} onChange={atualizaDescricao} />

                <label htmlFor="preco">Preço:</label>
                <input type="text" id="preco" value={preco} onChange={atualizaPreco}/>
                <button type="submit">Cadastrar</button>
            </form>

            
        </div>

    )

}
