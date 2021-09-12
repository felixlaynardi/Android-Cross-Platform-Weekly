import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react"
import { calculatorOutline, refreshOutline } from 'ionicons/icons'

interface Controls {
    onCalculate : () => void
    onReset : () => void
}

const Controls: React.FC<Controls> = (props) => {
    return (
        <IonRow>
            <IonCol className="ion-text-left">
                <IonButton onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
                <IonButton onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    )
}

export default Controls;