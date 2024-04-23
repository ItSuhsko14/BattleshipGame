import {useState} from 'react';
import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';
import { Field as FieldType } from '../../AppState/AppContext';

interface FieldProps {

}
const Field: React.FC<FieldProps> = () => {
    const { mode, userField, computerField, updateCellMode } = useAppContext();
    const [currentPlayer, setCurrentPlayer] = useState<'user' | 'computer'>('user');

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>, fieldToUpdate: FieldType) => {
        const target = event.target as HTMLDivElement;
        const cellIndex = parseInt(target.dataset.i!);
        const rowIndex = parseInt(target.dataset.j!);
        const cellMode = fieldToUpdate[cellIndex][rowIndex].mode;
        updateCellMode(cellIndex, rowIndex, cellMode, fieldToUpdate);
        if (cellMode !== 'occupied' && cellMode !== 'missed' && cellMode !== 'hit') {
            setCurrentPlayer(currentPlayer === 'user' ? 'computer' : 'user');
        } else {
            return
        }
    };

    const handleUserFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (currentPlayer === 'computer') {
            handleCellClick(event, userField);    
        }
        
    };
    
    // При кліку на поле computerField
    const handleComputerFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (currentPlayer === 'user') {
            handleCellClick(event, computerField);
        }
    };

    return (
        <div className={styles.container}>
            {(mode === 'setting' || mode === 'play') && (
                <div>
                    <h2 className={styles.fieldTitle}>Player 1</h2>
                    <FieldUI
                        field={userField}
                        onCellClick={handleUserFieldClick}
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
                            onCellClick={handleComputerFieldClick} />
                    </>

                }
            </div>


        </div>
    )
}

export default Field
