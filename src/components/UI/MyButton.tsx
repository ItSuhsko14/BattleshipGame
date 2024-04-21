import Button from '@mui/material/Button';
import styles from './button.module.css'

interface ButtonProps {
    buttonText: string
    onClick: () => void
}
const MyButton: React.FC<ButtonProps> = ({buttonText, onClick}) => {
    return (
        <div className={styles.basicButton}>
            <Button 
                variant="outlined" 
                color="primary"
                onClick={onClick}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export { MyButton as Button };