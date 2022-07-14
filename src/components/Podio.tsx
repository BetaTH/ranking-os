import styles from './modules/Podio.module.css'

interface props {
    arr: {equipe: string, pontos:number, classTransporte:string, fotoLink: string}[]
}

export function Podio(props: props){

    let removeEquipes = ['Emprestado', 'Correção']
    const newProps = props.arr.filter(df => df.classTransporte != "Moto" && !(removeEquipes.includes(df.equipe)))
    const count = Array.from({length: 5}, (_, i) => i + 1);
    return(
        <div className={styles.tela}>
            <h2>Podio</h2>
            <div className={styles.divNames}>
                <img src={newProps[0].fotoLink} alt="example" width="40px" height="54px"></img>
                <span>{newProps[0].equipe}</span>
                <span>{newProps[0].pontos}</span>
            </div>
            <div className={styles.divNames}>
                <img src={newProps[1].fotoLink} alt="example" width="40px" height="54px"></img> 
                <span>{newProps[1].equipe}</span>
                <span>{newProps[1].pontos}</span>
            </div>
            <div className={styles.divNames}>
                <img src={newProps[2].fotoLink} alt="example" width="40px" height="54px"></img> 
                <span>{newProps[2].equipe}</span>
                <span>{newProps[2].pontos}</span>
            </div>
            <div className={styles.divNames}>
                <img src={newProps[3].fotoLink} alt="example" width="40px" height="54px"></img> 
                <span>{newProps[3].equipe}</span>
                <span>{newProps[3].pontos}</span>
            </div>
            <div className={styles.divNames}>
                <img src={newProps[4].fotoLink} alt="example" width="40px" height="54px"></img> 
                <span>{newProps[4].equipe}</span>
                <span>{newProps[4].pontos}</span>
            </div>
            
        </div>
    )

}