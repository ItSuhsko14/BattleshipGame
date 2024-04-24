
import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';
import { computerShoot, checkOccupiedCells, getShipCells, isShipDestroyed } from '../../utils/actionFunctions';

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

    const handleCellClick = () => {
    };

    const computerAttack = (i: number, j: number) => {
        setCurrentPlayer('computer')
        setTimeout(() => {
            
        }, 2000 )
        const cellIndex = i;
        const rowIndex = j;
        const cellMode = userField[cellIndex][rowIndex].mode;
        updateCellMode(cellIndex, rowIndex, cellMode, userField);
        if (userField[cellIndex][rowIndex].mode == 'empty') {
            console.log(userField[cellIndex][rowIndex].mode);
            const {i, j} = computerShoot(userField);
            checkOccupiedCells(computerField) ? null : setWinner(currentPlayer);
            computerAttack(i, j);
        } else {
            setCurrentPlayer('user')
        }
    };
    
    const handleComputerFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
            handleCellClick();
            const target = event.target as HTMLDivElement;
            const cellIndex = parseInt(target.dataset.i!);
            const rowIndex = parseInt(target.dataset.j!);
            const cellMode = computerField[cellIndex][rowIndex].mode;
            updateCellMode(cellIndex, rowIndex, cellMode, computerField);
            console.log('current cell', cellIndex, rowIndex);
            console.log(computerField[cellIndex][rowIndex].mode);
            const ship =getShipCells(cellIndex, rowIndex, computerField)
            isShipDestroyed(cellIndex, rowIndex, computerField, ship)
            checkOccupiedCells(computerField) ? null : setWinner(currentPlayer);
            if (cellMode == 'empty') {
                setCurrentPlayer('computer')
                const {i, j} = computerShoot(userField);
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
                    <h2 className={styles.fieldTitle}>Player 1</h2>
                    <FieldUI
                        field={userField}
                        onCellClick={onUserClick}
                        isHidden={false}
                    />
                </div>
            )
            }
            <div>
                {mode === 'setting' && <Setting />}
                {mode === 'play' &&
                    <>
                        <h2 className={styles.fieldTitle}>Player 2</h2>
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
