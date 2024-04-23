import {useState} from 'react';
import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';
import { Field as FieldType } from '../../AppState/AppContext';

interface FieldProps {

}
const Field: React.FC<FieldProps> = () => {
    const { 
        mode, 
        userField, 
        computerField, 
        updateCellMode,
        currentPlayer,
        setCurrentPlayer    
    } = useAppContext();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>, fieldToUpdate: FieldType) => {
        const target = event.target as HTMLDivElement;
        const cellIndex = parseInt(target.dataset.i!);
        const rowIndex = parseInt(target.dataset.j!);
        const cellMode = fieldToUpdate[cellIndex][rowIndex].mode;
        updateCellMode(cellIndex, rowIndex, cellMode, fieldToUpdate);
        cellMode == 'empty' ? setCurrentPlayer(currentPlayer === 'user' ? 'computer' : 'user') : null;  
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
