package com.afm.trabalho_ps.service;

import com.afm.trabalho_ps.model.Encomenda;
import com.afm.trabalho_ps.model.Produto;
import com.afm.trabalho_ps.repository.ProdutoRepository;
import com.afm.trabalho_ps.util.TokenResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private final ProdutoRepository produtoRepository;

    @Autowired
    private InsumoService insumoService;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Optional<Produto> buscar(Long id) {
        return produtoRepository.findById(id);
    }

    public Iterable<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public void atualizar(Long id, Produto produtoAtualizado) {
        Optional<Produto> produtoOptional = produtoRepository.findById(id);
        if (produtoOptional.isPresent()) {
            Produto produtoExistente = produtoOptional.get();
            produtoExistente.setNome(produtoAtualizado.getNome());
            produtoExistente.setDescricao(produtoAtualizado.getDescricao());
            produtoRepository.save(produtoExistente);
        }
    }

    public void deletar(Long id) {
        if (produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
        }
    }

    public void deletarTodos() {
        produtoRepository.deleteAll();
    }

    public TokenResponse encomendarProduto(Encomenda encomenda) throws Exception {
        Optional<Produto> produto = produtoRepository.findById(encomenda.getIdProduto());
        if (produto.isPresent()) {
            boolean r = insumoService.verificaInsumos(produto.get(), encomenda.getQuantidade());
            if (r) {
                insumoService.retiraInsumosParaEncomenda(produto.get(), encomenda.getQuantidade());
                return new TokenResponse(1);
            } else {
                return new TokenResponse(0);
            }
        } else {
            throw new Exception("Produto não encontrado");
        }
    }

    public Long buscarIdPorNome(String nome) {
        for (Produto produto : produtoRepository.findAll()) {
            if (produto.getNome().equalsIgnoreCase(nome)) {
                return produto.getId();
            }
        }
        throw new RuntimeException("Insumo não encontrado com nome: " + nome);
    }

}