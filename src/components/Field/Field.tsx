import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';

interface FieldProps {
    
}
const Field: React.FC<FieldProps> = () => {
    const { mode, userField, computerField }  = useAppContext();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Отримання координат ячейки з події onClick
        const target = event.target as HTMLDivElement;
        const cellIndex = parseInt(target.dataset.cellIndex!);
        const rowIndex = parseInt(target.dataset.rowIndex!);
      console.log(cellIndex, rowIndex);
      
    };

    return (
        <div className={styles.container}>
            {(mode === 'setting' || mode === 'play') && (
                <div>
                    <h2 className={styles.fieldTitle}>Player 1</h2>
                    <FieldUI 
                        field={userField}
                        onCellClick={(e) => handleCellClick(e)}
                    />
                </div>
                )
            }
            <div>
                {mode === 'setting' && <Setting/>}
                {mode === 'play' && 
                    <>
                        <h2 className={styles.fieldTitle}>Player 2</h2>
                        <FieldUI 
                            field={computerField}
                            onCellClick={handleCellClick}/>
                    </>
                    
                }
            </div>


        </div>
    )
}

export default Field
