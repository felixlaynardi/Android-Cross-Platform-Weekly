import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react"

interface CalculatedResults { 
    results : number | undefined
    status : string | undefined
}

const CalculatedResults: React.FC<CalculatedResults> = (props) => {
    if(props.results == undefined){
        return null
    }
    else{
        return (
            <IonRow>
                <IonCol>
                    <IonCard>
                        <IonCardContent className="ion-text-center">
                            <h2>{props.results}</h2>
                            <h1>{props.status}</h1>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        )
    }
}

export default CalculatedResults; 