import { useAppContext } from '../../AppState/AppContext';
import { styled } from '@mui/system';
import { Modal, Typography, Button } from '@mui/material';

const ModalContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', 
    height: 'fit-content',
  });
  
  
  const PaperContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '2px solid #000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '16px',
  });

const GameOverModal = () => {
  const { winner, setWinner } = useAppContext();
  
  const handleClose = () => {
    console.log(winner);
    
    setWinner('null');
    console.log(winner);
    
  };
  
  return (
    <Modal
      open={winner !== 'null'}
      onClose={() => setWinner('null')}
      aria-labelledby="game-over-modal-title"
      aria-describedby="game-over-modal-description"
    >
       <ModalContainer>
        <PaperContainer>
          <Typography color="primary" variant="h5" id="game-over-modal-title" gutterBottom>
            Кінець гри
          </Typography>
          <Typography color="primary" variant="h5" id="game-over-modal-description" gutterBottom>
             {winner === "user" ? "Ви перемогли!" : "Ви програли!"}
          </Typography>
            <Button onClick={handleClose}
            >
                Закрити
            </Button>
        </PaperContainer>
      </ModalContainer>
    </Modal>
  );
};

export default GameOverModal;