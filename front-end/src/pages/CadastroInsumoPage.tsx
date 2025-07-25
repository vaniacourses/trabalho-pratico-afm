import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type Insumo from '../interfaces/Insumo'
import useCadastrarInsumo from '../hooks/useCadastrarInsumo'

const cardStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: '40px auto',
    padding: '32px 24px',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const titleStyle: React.CSSProperties = {
    marginBottom: 24,
    fontWeight: 600,
    fontSize: 24,
    color: '#333',
    letterSpacing: 1,
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    marginBottom: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
}

const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    borderRadius: 6,
    border: 'none',
    background: '#1976d2',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 8,
}

type InsumoForm = {
    nome: string
    quantidade: number
}

const CadastroInsumoPage = () => {
    const { register, handleSubmit, reset } = useForm<InsumoForm>()
    const [mensagem, setMensagem] = useState<string | null>(null)
    const navigate = useNavigate()

    const cadastrarInsumo = async (data: InsumoForm) => {
        setMensagem(null)
        const novoInsumo: Insumo = {
            nome: data.nome,
            quantidade: data.quantidade
        }
        try {
            await useCadastrarInsumo(novoInsumo)
            setMensagem('Insumo cadastrado com sucesso!')
            reset()
            setTimeout(() => {
                setMensagem(null)
                navigate('/cadastro')
            }, 1500)
        } catch (error: any) {
            setMensagem('Erro ao cadastrar insumo')
            setTimeout(() => setMensagem(null), 3000)
        }
    }

    return (
        <div style={cardStyle}>
            <h4 style={titleStyle}>Insira os dados do insumo</h4>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(cadastrarInsumo)}>
                <input
                    style={inputStyle}
                    {...register('nome')}
                    placeholder="Nome do insumo"
                    required
                />
                <input
                    style={inputStyle}
                    type="number"
                    {...register('quantidade', { valueAsNumber: true })}
                    placeholder="Quantidade"
                    required
                />
                <button style={buttonStyle} type="submit">
                    Cadastrar
                </button>
            </form>
            {mensagem && (
                <div style={{
                    marginTop: 16,
                    padding: 12,
                    borderRadius: 6,
                    background: mensagem.includes('sucesso') ? '#d4edda' : '#f8d7da',
                    color: mensagem.includes('sucesso') ? '#155724' : '#721c24',
                    border: mensagem.includes('sucesso') ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
                }}>
                    {mensagem}
                </div>
            )}
        </div>
    )
}

export default CadastroInsumoPage