import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';

interface FieldProps {
}
const Field: React.FC<FieldProps> = () => {
    const { mode } = useAppContext()
    console.log(mode);

    return (
        <div className={styles.container}>
            {(mode === 'setting' || mode === 'play') && (
                <div>
                    <h2 className={styles.fieldTitle}>Player 1</h2>
                    <FieldUI fieldSize={10} />
                </div>
                )
            }
            <div>
                {mode === 'setting' && <Setting/>}
                {mode === 'play' && 
                    <>
                        <h2 className={styles.fieldTitle}>Player 2</h2>
                        <FieldUI fieldSize={10} />
                    </>
                    
                }
            </div>


        </div>
    )
}

export default Field
