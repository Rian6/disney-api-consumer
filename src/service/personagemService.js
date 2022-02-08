import { useEffect, useState } from 'react';
import { get } from '../conexao/conector';

let todosPersonagens = []

export async function preencherPersonagens(totalPaginas) {
    console.log("teste")
    let i = 1

    while (i <= totalPaginas) {
        const prs = await get("characters?page=" + i)

        prs.data.map((per) => {
            todosPersonagens.push(per)
            console.log(i)
        })
        i++
    }
}

export async function buscarPersonagemPorNome(nome) {
    let personagemFiltrado = []
    let i = 1

    todosPersonagens.map((per) => {
        if (per.name == nome) {
            personagemFiltrado.push(per)
        }
    })

    return personagemFiltrado
}

export async function buscarPersonagemPorFilme(filme) {
    let personagemFiltrado = []
    let i = 1

    todosPersonagens.map((per) => {
        per.films.map((fil) => {
            if (fil == filme) {
                personagemFiltrado.push(per)
            }
        })
    })

    console.log(personagemFiltrado)
    return personagemFiltrado
}

export async function buscarPersonagemPorTvShow(tvShow) {
    let personagemFiltrado = []
    let i = 1

    todosPersonagens.map((per) => {
        per.tvShows.map((fil) => {
            if (fil == tvShow) {
                personagemFiltrado.push(per)
            }
        })
    })

    console.log(personagemFiltrado)
    return personagemFiltrado
}

export async function buscarPersonagemPorVideoGame(videoGame) {
    let personagemFiltrado = []
    let i = 1

    todosPersonagens.map((per) => {
        per.videoGames.map((fil) => {
            if (fil == videoGame) {
                personagemFiltrado.push(per)
            }
        })
    })

    console.log(personagemFiltrado)
    return personagemFiltrado
}