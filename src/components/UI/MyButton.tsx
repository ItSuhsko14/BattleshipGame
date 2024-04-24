import Button from '@mui/material/Button';
import styles from './button.module.css'

interface ButtonProps {
    buttonText: string
    onClick: () => void
    disabled: boolean
}
const MyButton: React.FC<ButtonProps> = ({buttonText, onClick, disabled}) => {
    return (
        <div className={styles.basicButton}>
            <Button 
                variant="contained" 
                color="primary"
                onClick={onClick}
                disabled={disabled}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export { MyButton as Button };