import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'
import { generateGameData} from "../../utils/utils"
import { GameData } from './../../AppState/AppContext';

interface NavBarProps {

}
const NavBar: React.FC<NavBarProps> = () => {
    const { mode, setMode, setUserField } = useAppContext()
    
    const handleCreateShipsClick = () => {
        const boardSize = 10; // Розмір поля
        const shipLengths = [5, 4, 3, 3, 2]; // Довжина кораблів

    
        const gameData: GameData = generateGameData(boardSize, shipLengths);
        setUserField(gameData)
        setMode('play'); // Змінюємо режим гри на "play"
    };
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
            <Button
                buttonText="Створити кораблі"
                onClick={handleCreateShipsClick}
            />
        </div>
    )
}

export default NavBar