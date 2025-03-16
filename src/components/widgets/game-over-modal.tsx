import { styled } from '@mui/system';
import { Modal, Typography } from '@mui/material';
import Button from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';

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

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal = ({ onClose }: GameOverModalProps) => {
  const { winner, resetGame } = useAppContext();

  const handleClose = () => {
    resetGame();
    onClose();
  };

  return (
    <Modal
      open={winner !== null}
      onClose={handleClose}
      aria-labelledby="game-over-modal-title"
      aria-describedby="game-over-modal-description"
    >
      <ModalContainer>
        <PaperContainer className="rounded-xl max-w-xl w-full aspect-video h-auto p-5">
          <Typography
            color="primary"
            variant="h2"
            id="game-over-modal-description"
            gutterBottom
          >
            {winner === 'user' ? 'Ви перемогли!' : 'Ви програли!'}
          </Typography>
          <Button onClick={handleClose}>Закрити</Button>
        </PaperContainer>
      </ModalContainer>
    </Modal>
  );
};

export default GameOverModal;
