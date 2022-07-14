import styles from './modules/RankingMotos.module.css'

interface props {
    arr: {equipe: string, pontos:number, classTransporte:string, fotoLink: string}[]
}

export function RankingMotos(props: props){
    
    let removeEquipes = ['Emprestado', 'Correção']
    const newProps = props.arr.filter(df => df.classTransporte != "Carro" && !(removeEquipes.includes(df.equipe)))
    const count = Array.from({length: 7}, (_, i) => i + 1);
    return(
        <div className={styles.tela}>
            <h2>Ranking Motos</h2>
            <div className={styles.tela2}>
            <table className={styles.tables}>
                <thead>
                    <tr>
                        <th>Pos.</th>
                        <th>Nome</th>
                        <th>Pontos</th>
                    </tr>                   
                </thead>
                <tbody>
                    {
                    count.map((pos,id) => {
                        if(pos<=7){
                            return(
                                <tr key = {id}>
                                <td>{pos}</td>
                                <td>{newProps[id]?newProps[id].equipe:""}</td>
                                <td>{newProps[id]?newProps[id].pontos:""}</td>
                                </tr>
                            )  
                        }
                    })
                    }
                </tbody>
            </table>
            </div>
        </div>
        
    )
}