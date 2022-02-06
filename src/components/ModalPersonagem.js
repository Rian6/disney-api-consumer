import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

function ModalPersonagem(personagemSelecionado) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#f1faee',
    boxShadow: 10,
    borderRadius: 10,
    p: 4,
  };

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ maxHeight: '100%', overflow: 'auto' }} >
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
  );
}

export default ModalPersonagem;
