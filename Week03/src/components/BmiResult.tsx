import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react"

interface BmiResult { 
    results : number | undefined
    status : string | undefined
}

const BmiResult: React.FC<BmiResult> = (props) => {
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

export default BmiResult; 