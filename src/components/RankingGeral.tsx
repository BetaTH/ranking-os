import styles from './modules/RankingGeral.module.css'

interface props {
    arr: {equipe: string, pontos:number, classTransporte:string, fotoLink: string}[]
}

export function RankingGeral(props : props){

    let removeEquipes = ['Emprestado', 'Correção']
    const newProps = props.arr.filter(df => df.classTransporte != "Moto" && !(removeEquipes.includes(df.equipe)))
    const count = Array.from({length: 62}, (_, i) => i + 1);
    return(
        <div className={styles.tela}>
            <h2>Ranking Geral</h2>
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
                        if(pos<=31){
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
                        if(pos>31){
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



//CODIGOS QUE ALTERADOS MAS QUE PODEM SER REUTILIZADOS

    // newProps?.map((dataROW:propsElement,id) => {
    //     if(id<=30){
    //     return(
    //     <tr key = {id}>
    //     <td>{id + 1}</td>
    //     <td>{dataROW.equipe}</td>
    //     <td>{dataROW.pontos}</td>
    //     </tr>
    // )}})

    // newProps?.map((dataROW:propsElement,id) => {
    //     if(id>count.length){
    //     return(
    //     <tr key = {id}>
    //     <td>{id + 1}</td>
    //     <td>{dataROW.equipe}</td>
    //     <td>{dataROW.pontos}</td>
    //     </tr>
    // )}})

    // interface propsElement {
    //     equipe: string,
    //     pontos: number,
    //     classTransporte:string
    // }

