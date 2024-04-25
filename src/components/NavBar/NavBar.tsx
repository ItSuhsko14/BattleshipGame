import { useState } from "react"
import { Button } from "../UI/MyButton"
import { useAppContext } from "../../AppState/AppContext"
import styles from './navBar.module.css'
import generateShips, { clearUserField } from './../../utils/utils'
import { shipConfigurations } from "../../utils/shipConfiguration"

interface NavBarProps {
}
const NavBar: React.FC<NavBarProps> = () => {
    const { 
        mode, 
        setMode, 
        setUserField, 
        setComputerField,
        userField
    } = useAppContext();
    const [isUserFieldReady, setIsUserFieldReady] = useState<boolean>(false);

    let message: string;
    switch (mode) {
        case 'null':
            message = 'Вітаю у грі Лютий бій! Гра розроблена як технічне завдання спеціально для ютуб канала Сергія Бабіча. Для початку гри натисніть "Почати гру" та отримуйте задоволення!';
            break;
        case 'setting':
            message = 'Натисність "Розставитит", щоб згенерувати або змінити положення кораблів. Натисніть "Погнали" для початку гри';
            break;
        case 'play':
            message = 'Робіть ходи';
            break;
        default:
            message = '';
            }
    const handleCreateShipsClick = () => {

        const shipPlacement = generateShips(shipConfigurations);
        setUserField(shipPlacement)
        setIsUserFieldReady(true)
        console.log(isUserFieldReady);
        
    };
    const handleButtonClick = () => {
        if (mode === 'null') {
            clearUserField(userField);
            setMode('setting')
        } else if (mode === 'setting') {
            const shipPlacement = generateShips(shipConfigurations);
            setComputerField(shipPlacement);
            setMode('play')
        } else {
            setMode('null')
            setIsUserFieldReady(false)
        }

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title} >Лютий бій</h1>
            <div className={styles.controlContainer}>
                <Button
                    buttonText={
                        mode === 'null'
                            ? 'Почати нову гру'
                            : mode === 'setting'
                                ? 'Погнали'
                                : 'Завершити гру'
                    }
                    onClick={handleButtonClick}
                    disabled={mode !== 'null' && !isUserFieldReady}
                />
                {mode === 'setting' && <Button buttonText="Розставити" onClick={handleCreateShipsClick} disabled={false}/>}
            </div>
            <span className={styles.message}> {message} </span>
        </div >
    )
}

export default NavBar