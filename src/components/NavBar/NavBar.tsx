import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'
import generateShips from './../../utils/utils'
import { shipConfigurations } from "../../utils/shipConfiguration"

interface NavBarProps {
}
const NavBar: React.FC<NavBarProps> = () => {
    const { 
        mode, 
        setMode, 
        setUserField, 
        setComputerField,
        currentPlayer
    } = useAppContext();

    console.log(mode);


    const handleCreateShipsClick = () => {

        const shipPlacement = generateShips(shipConfigurations);
        setUserField(shipPlacement)
    };
    const handleButtonClick = () => {
        if (mode === 'null') {
            setMode('setting')
        } else if (mode === 'setting') {
            const shipPlacement = generateShips(shipConfigurations);
            setComputerField(shipPlacement);
            setMode('play')
        } else {
            setMode('null')
        }

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Лютий бій</h1>
            <div className={styles.controlContainer}>
                <Button
                    buttonText={
                        mode === 'null'
                            ? 'Нова гра'
                            : mode === 'setting'
                                ? 'Завершити налаштування'
                                : 'Завершити гру'
                    }
                    onClick={handleButtonClick}
                />
                <Button
                    buttonText="Створити кораблі"
                    onClick={handleCreateShipsClick}
                />
                <span>{currentPlayer === 'user' ? 'Ваш хід' : 'Хід компютера'}</span>
            </div>
        </div >
    )
}

export default NavBar