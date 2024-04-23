import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'
import generateShips from './../../utils/utils'
import { shipConfigurations } from "../../utils/shipConfiguration"

interface NavBarProps {

}
const NavBar: React.FC<NavBarProps> = () => {
    const { mode, setMode, setUserField, setComputerField } = useAppContext();

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