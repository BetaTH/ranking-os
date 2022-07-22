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
        <div onClick={() => props.setIsModalVisibel(false)} className={styles.conteiner}>
            <div className={styles.modal}>
                <form >
                    <div>{OStoEdit.idOS}</div>
                    <div>{OStoEdit.operador}</div>
                    <div>{OStoEdit.zona}</div>
                    <div>{OStoEdit.cliente}</div>
                    <div>{OStoEdit.tipoOS}</div>
                    <div>{OStoEdit.equipe}</div>
                    <div>{OStoEdit.equipe}</div>
                    <div>{OStoEdit.transporte}</div>
                    <div>{OStoEdit.dataAbertura}</div>
                    <div>{OStoEdit.dataFechamento}</div>
                    <div>{OStoEdit.taxa}</div>
                    <div>{OStoEdit.correcao}</div>
                    <div>{OStoEdit.pontos}</div>
                </form>
            </div>
        </div>
    )   
}
