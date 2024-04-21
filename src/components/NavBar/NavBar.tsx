import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'

interface NavBarProps {
    
}
const NavBar: React.FC<NavBarProps> = () => {
    const {mode, setMode} = useAppContext()
    const handleButtonClick = () => {
        if (mode === 'null') {
            setMode('setting')
        } else if (mode === 'setting') {
            setMode('play')
        } else {
            setMode('null')
        }
        
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Лютий бій</h1>
            <Button 
                buttonText={
                    mode === 'null' 
                        ? 'Нова гра' 
                        : mode === 'setting' 
                            ? 'Почати гру' 
                            : 'Завершити гру'
                } 
                onClick={handleButtonClick}
            />
        </div>
    )
}

export default NavBar