import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react"
import { calculatorOutline, refreshOutline } from 'ionicons/icons'

interface Controls {
    onCalculate : () => void
    onReset : () => void
}

const Controls: React.FC<Controls> = (props) => {
    return (
        <IonRow>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton expand="block" color="success" onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton expand="block" fill="clear" color="medium" onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    )
}

export default Controls;