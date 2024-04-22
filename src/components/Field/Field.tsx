import styles from './field.module.css'
import FieldUI from './FieldUI';
import { useAppContext } from '../../AppState/AppContext';
import Setting from './Setting';

interface FieldProps {
}
const Field: React.FC<FieldProps> = () => {
    const { mode, userField, computerField }  = useAppContext();

    return (
        <div className={styles.container}>
            {(mode === 'setting' || mode === 'play') && (
                <div>
                    <h2 className={styles.fieldTitle}>Player 1</h2>
                    <FieldUI field={userField} />
                </div>
                )
            }
            <div>
                {mode === 'setting' && <Setting/>}
                {mode === 'play' && 
                    <>
                        <h2 className={styles.fieldTitle}>Player 2</h2>
                        <FieldUI field={computerField} />
                    </>
                    
                }
            </div>


        </div>
    )
}

export default Field
