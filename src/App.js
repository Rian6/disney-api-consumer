import { useEffect, useState } from 'react';

//css
import './App.css';
import {
  fontBranca,
  styleCampoPesquisa,
  styleCardPersonagem,
  styleContainerCardPersonagem,
  styleDivCarregando,
  styleModal
} from './AppStyle';

//service
import { get } from './conexao/conector';
import {
  buscarPersonagemPorFilme,
  buscarPersonagemPorNome,
  buscarPersonagemPorTvShow,
  buscarPersonagemPorVideoGame,
  preencherPersonagens
} from './service/personagemService';

//components local
import { ModeloDescricao } from './components/ModeloDescricao';

//components api
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function App() {

  //VARIAVEIS
  const [personagens, setPersonagens] = useState([])
  const [numeroPagina, setNumeroPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [totalPaginasReal, setTotalPaginasReal] = useState(0)
  const [personagemSelecionado, setPersonagemSelecionado] = useState({})
  const [tipoPesquisa, setTipoPesquisa] = useState(0)
  const [nomePersonagem, setNomePersonagem] = useState("")
  const [nomeFilme, setNomeFilme] = useState("")
  const [nomeVideo, setNomeVideo] = useState("")
  const [nomeTv, setNomeTv] = useState("")
  const [carregando, setCarregando] = useState(false)

  let numeroPaginaTmp = 1

  //MODAL
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  //METODOS
  useEffect(() => {
    guardarPersonagens()
  }, [!personagens]);


  const pesquisarPersonagem = async () => {
    setCarregando(true)
    let prs

    if (tipoPesquisa == 0) {
      prs = await personagemPorNome()
      definirPersonagensZerarPaginas(prs)
    }
    if (tipoPesquisa == 1) {
      prs = await personagemPorFilme()
      definirPersonagensZerarPaginas(prs)
    }
    if (tipoPesquisa == 2) {
      prs = await personagemPorTvShow()
      definirPersonagensZerarPaginas(prs)
    }
    if (tipoPesquisa == 3) {
      prs = await personagemPorVideoGame()
      definirPersonagensZerarPaginas(prs)
    }
    if (tipoPesquisa == 4) {
      await buscarTodosPersonagens()
    }

    setCarregando(false)
  }

  const definirPersonagensZerarPaginas = async (prs) => {
    setPersonagens(prs)
    setTotalPaginas(0)
  }

  const personagemPorNome = async () => {
    const prs = await buscarPersonagemPorNome(nomePersonagem)
    return prs
  }

  const personagemPorFilme = async () => {
    const prs = await buscarPersonagemPorFilme(nomeFilme)
    return prs
  }

  const personagemPorTvShow = async () => {
    const prs = await buscarPersonagemPorTvShow(nomeTv)
    return prs
  }

  const personagemPorVideoGame = async () => {
    const prs = await buscarPersonagemPorVideoGame(nomeVideo)
    return prs
  }

  const guardarPersonagens = async () => {
    setCarregando(true)
    let totalPages = await buscarTodosPersonagens()

    await preencherPersonagens(totalPages)
    setCarregando(false)
  }

  const buscarTodosPersonagens = async () => {
    const prs = await get("characters?page=" + numeroPaginaTmp)
    setPersonagens(prs.data)
    setTotalPaginas(prs.totalPages)
    setTotalPaginasReal(prs.totalPages)
    return prs.totalPages
  }

  const escolherPagina = async (event, value) => {
    await setNumeroPagina(value)
    numeroPaginaTmp = value
    await buscarTodosPersonagens()
  };

  const selecionarPersonagem = async (personagem) => {
    setOpen(true)
    setPersonagemSelecionado(personagem)
  };

  //COMPONENTE PRINCIPAL
  return (
    <div className='div-fundo'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleModal}>
          <div style={{ maxHeight: 500, overflowY: 'auto' }} >
            <Avatar
              style={{ width: 150, height: 150 }}
              alt="Remy Sharp"
              src={personagemSelecionado.imageUrl} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {personagemSelecionado.name}
            </Typography>
            <Divider />
            <ModeloDescricao tipo={personagemSelecionado.films} nome="Filmes" />
            <ModeloDescricao tipo={personagemSelecionado.shortFilms} nome="Filmes Curtos" />
            <ModeloDescricao tipo={personagemSelecionado.tvShows} nome="Shows de tv" />
            <ModeloDescricao tipo={personagemSelecionado.videoGames} nome="VideoGames" />
            <ModeloDescricao tipo={personagemSelecionado.parkAttractions} nome="Atrações" />
            <ModeloDescricao tipo={personagemSelecionado.allies} nome="Aliados" />
            <ModeloDescricao tipo={personagemSelecionado.enemies} nome="Inimigos" />
          </div>
        </Box>
      </Modal>
      {carregando ?
        <div style={styleDivCarregando}>
          <img
            onAnimationEnd={false}
            src='./gif-load.gif' width={200} />
          <h5>Carregando Personagens...</h5>
        </div>
        :
        <div className='div-pesquisa'>
          <div className='div-pesquisa-campos'>
            <img src='./disney-logo.png' width={200} />
            <h2 style={fontBranca}>Disney Api</h2>
            <h4 style={fontBranca}>Pesquisar</h4>
            <div>
              {tipoPesquisa == 0 ?
                <TextField
                  value={nomePersonagem}
                  style={styleCampoPesquisa}
                  onChange={(e) => setNomePersonagem(e.target.value)}
                  label="Nome"
                  variant="filled"
                  color="success"
                  focused />
                : null}

              {tipoPesquisa == 1 ?
                <TextField
                  value={nomeFilme}
                  style={styleCampoPesquisa}
                  onChange={(e) => setNomeFilme(e.target.value)}
                  label="Filme"
                  variant="standard"
                  color="success"
                  focused />
                : null}

              {tipoPesquisa == 2 ?
                <TextField
                  value={nomeTv}
                  style={styleCampoPesquisa}
                  onChange={(e) => setNomeTv(e.target.value)}
                  label="Tv Show"
                  variant="standard"
                  color="success"
                  focused />
                : null}

              {tipoPesquisa == 3 ?
                <TextField
                  value={nomeVideo}
                  style={styleCampoPesquisa}
                  onChange={(e) => setNomeVideo(e.target.value)}
                  label="Video-Game"
                  variant="standard"
                  color="success"
                  focused />
                : null}

              <Select
                value={tipoPesquisa}
                style={styleCampoPesquisa}
                label="Pesquisar por:"
                onChange={(event) => setTipoPesquisa(event.target.value)}>
                <MenuItem value={4}>Todos</MenuItem>
                <MenuItem value={0}>Nome</MenuItem>
                <MenuItem value={1}>Filme</MenuItem>
                <MenuItem value={2}>TV Show</MenuItem>
                <MenuItem value={3}>Video-Game</MenuItem>
              </Select>

              <Button
                onClick={() => {
                  pesquisarPersonagem();
                }}
                color={'success'}
                variant="contained">Pesquisar</Button>
            </div>
          </div>
          <div style={styleContainerCardPersonagem}>
            <Grid container rowSpacing={4}>
              {personagens.map((per) =>
                <Grid item xs={2}>
                  <Button>
                    <Card
                      style={styleCardPersonagem}
                      onClick={() => selecionarPersonagem(per)}
                      className="card-personagem">
                      <CardMedia
                        component="img"
                        height="200"
                        width="150"
                        image={per.imageUrl} />
                      <CardContent>
                        <h4 style={fontBranca}>
                          {per.name}
                        </h4>
                      </CardContent>
                    </Card>
                  </Button>
                </Grid>
              )}
            </Grid>
            <div class="row justify-content-center">
              <Pagination
                style={fontBranca}
                count={totalPaginas}
                color="primary"
                shape="rounded"
                page={numeroPagina}
                onChange={escolherPagina} />
            </div>
          </div>
        </div>}
    </div>
  );
}

export default App;
