import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react"
import { calculatorOutline, refreshOutline } from 'ionicons/icons'

interface BMIControls {
    onCalculate : () => void
    onReset : () => void
}

const BMIControls: React.FC<BMIControls> = (props) => {
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

export default BMIControls;