import { useState } from 'react';
import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import { computerShoot, checkOccupiedCells, getShipCells, isShipDestroyed, markMissedAdjacentCells } from '../../utils/actionFunctions';

interface FieldProps {

}
const Field: React.FC<FieldProps> = () => {
    const { 
        mode, 
        userField, 
        setWinner,
        computerField, 
        updateCellMode,
        currentPlayer,
        setCurrentPlayer    
    } = useAppContext();

    const [prevShot, setPrevShot] = useState<{ i: number, j: number } | null>(null);
    const handleCellClick = () => {
    };

    const computerAttack = (i: number, j: number) => {
        setCurrentPlayer('computer')
        const cellIndex = i;
        const rowIndex = j;
        const cellMode = userField[cellIndex][rowIndex].mode;
        console.log(userField[i][j].mode);
        userField[i][j].mode === 'occupied' ? setPrevShot({i, j}) : setPrevShot(null);
        updateCellMode(cellIndex, rowIndex, cellMode, userField);
        const ship = getShipCells(cellIndex, rowIndex, userField)
        isShipDestroyed(cellIndex, rowIndex, userField, ship) ? markMissedAdjacentCells(ship, computerField) : null;
        console.log(userField[cellIndex][rowIndex].mode);
        if (userField[cellIndex][rowIndex].mode == 'hit') {
            const {i, j} = computerShoot(userField, prevShot);
            checkOccupiedCells(computerField) ? null : setWinner(currentPlayer);
            computerAttack(i, j);
        } else {
            setCurrentPlayer('user')
        }
    };
    
    const handleComputerFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
            console.log('---userShot---');
            handleCellClick();
            const target = event.target as HTMLDivElement;
            const cellIndex = parseInt(target.dataset.i!);
            const rowIndex = parseInt(target.dataset.j!);
            const cellMode = computerField[cellIndex][rowIndex].mode;
            updateCellMode(cellIndex, rowIndex, cellMode, computerField);
            const ship = getShipCells(cellIndex, rowIndex, computerField)
            isShipDestroyed(cellIndex, rowIndex, computerField, ship) ? markMissedAdjacentCells(ship, computerField) : null;
            checkOccupiedCells(computerField) ? null : setWinner(currentPlayer);
            if (cellMode == 'empty') {
                setCurrentPlayer('computer')
                const {i, j} = computerShoot(userField, prevShot);
                computerAttack(i, j);
            }
    };

    const onUserClick = () => {
        console.log('User click');
        
    }

    return (
        <div className={styles.container}>
            {(mode === 'setting' || mode === 'play') && (
                <div>
                    <h2 className={styles.fieldTitle}>Ваше поле</h2>
                    <FieldUI
                        field={userField}
                        onCellClick={onUserClick}
                        isHidden={false}
                    />
                </div>
            )
            }
            <div>
                {mode === 'play' &&
                    <>
                        <h2 className={styles.fieldTitle}>Компьютер</h2>
                        <FieldUI
                            field={computerField}
                            onCellClick={handleComputerFieldClick} 
                            isHidden={true}
                        />
                    </>
                }
            </div>
        </div>
    )
}
export default Field
