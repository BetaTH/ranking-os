import styles from "./styles.module.scss";

interface OStoEit {
    idOS: number;
    operador: string;
    zona: string;
    cliente: string;
    tipoOS: string;
    equipe: string;
    transporte: string;
    dataAbertura: string;
    dataFechamento: string;
    trs: string;
    taxa: string;
    correcao: string;
    pontos: number;
}

interface props {
    OStoEdit: OStoEit
    setOStoEdit: Function;
    setIsModalVisibel: Function;
}


export function Modal (props : props){
    
    const OStoEdit = props.OStoEdit

    return (
        <div id = "Conteiner" onClick={(e) => (e.target as HTMLDivElement).id=="Conteiner"?props.setIsModalVisibel(false):null} className={styles.conteiner}>
            <div className={styles.modal}>
                <div className={styles.formModal}>
                    <div className={styles.rowTitle}>
                        <div style = {{borderBottom: "0.1rem solid #2C3639", padding:"0rem 1.5rem"}}><h2 className={styles.title}>Edição de OS</h2></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>ID OS: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.idOS}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Operador </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.operador}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Zona: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.zona}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>ID Cliente: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.cliente}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Tipo da OS: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.tipoOS}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Equipe: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.equipe}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Transporte: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.transporte}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Data de Abertura: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.dataAbertura}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Data de Fechamento: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.dataFechamento}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Taxa: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.taxa}/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.rowLabel}>
                            <label className={styles.label}>Status Correção: </label>
                        </div>
                        <div className={styles.rowInput}>
                            <input className={styles.input} type="text" defaultValue={OStoEdit.correcao}/>
                        </div>
                    </div>
                    <div className={styles.rowButton}>
                        <button className={styles.saveButton} onClick={()=> props.setIsModalVisibel(false)}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )   
}
