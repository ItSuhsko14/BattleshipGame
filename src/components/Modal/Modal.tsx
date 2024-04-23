import { useAppContext } from '../../AppState/AppContext';
import { styled } from '@mui/system';
import { Modal, Typography, Button } from '@mui/material';

const ModalContainer = styled('div')({
    position: 'fixed',
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content', 
    height: 'fit-content',
  });
  
  
  const PaperContainer = styled('div')({
    backgroundColor: '#ffffff',
    border: '2px solid #000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '16px',
  });

const GameOverModal = () => {
  const { winner, setWinner } = useAppContext();

  return (
    <Modal
      open={winner !== 'null'}
      onClose={() => setWinner('null')}
      aria-labelledby="game-over-modal-title"
      aria-describedby="game-over-modal-description"
    >
       <ModalContainer>
        <PaperContainer>
          <Typography variant="h5" id="game-over-modal-title" gutterBottom>
            Гра закінчилась
          </Typography>
          <Typography variant="body1" id="game-over-modal-description" gutterBottom>
             {winner === "user" ? "Ви перемогли!" : "Ви програли!"}
          </Typography>
            <Button onClick={() => {
                setWinner('null')
                }
            }
            >
                Закрити
            </Button>
        </PaperContainer>
      </ModalContainer>
    </Modal>
  );
};

export default GameOverModal;