import styles from "./field.module.css";
export default function FieldUI({ fieldSize }: { fieldSize: number }) {
    return (
        <div className={styles.fieldContainer}>
            <h1 className={styles.fieldTitle}> Player 1</h1>
            <div className={styles.field}>
                {Array.from({ length: fieldSize }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {Array.from({ length: fieldSize }).map((_, colIndex) => (
                            <div key={colIndex} className={styles.cell}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
