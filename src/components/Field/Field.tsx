import styles from './field.module.css'
import FieldUI from './FieldUI';

export default function Field() {
    return (
        <div className={styles.container}>
            <FieldUI fieldSize={10}/>
            <FieldUI fieldSize={10}/>
        </div>
    )
}
