import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'
import generateShips from './../../utils/utils'

interface NavBarProps {

}
const NavBar: React.FC<NavBarProps> = () => {
    const { mode, setMode, setUserField } = useAppContext();

    console.log(mode);


    const handleCreateShipsClick = () => {
        const shipConfigurations: [number, number][] = [
            [4, 1], // 1 корабель з 4 палубами
            [3, 2], // 2 кораблі з 3 палубами
            [2, 3], // 3 кораблі з 2 палубами
            [1, 4], // 4 кораблі з 1 палубою
        ];
        const shipPlacement = generateShips(shipConfigurations);
        console.log(shipPlacement);

        setUserField(shipPlacement)

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