import styles from "./field.module.css";

interface FieldUIProps {
    fieldSize: number;
}

const FieldUI: React.FC<FieldUIProps> = ( { fieldSize } ) => {
    const rows: JSX.Element[] = [];
    for (let i=0; i<fieldSize; i++) {
        const cell = [];
        for (let j=0; j<fieldSize; j++) {
            cell.push(
                <div key={j} className={styles.cell}></div>
            )            
        }
        rows.push(<div key={i} className={styles.row}>{cell}</div>)
    }
    console.log(rows);
      
    return (
        <div className={styles.fieldContainer}>{rows}</div>
    );
}

export default FieldUI;