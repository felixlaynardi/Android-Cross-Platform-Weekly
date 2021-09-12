import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react"

interface InputControl {
    selectedValue: 'cmkg' | 'ftlbs'
    onSelectValue: (value: 'cmkg' | 'ftlbs') => void
    resetCalculation: () => void
}

const InputControl: React.FC<InputControl> = (props) => {
    const inputChangeHandler = (event:CustomEvent) => {
        props.onSelectValue(event.detail.value);
    }
    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
            <IonSegmentButton onClick={props.resetCalculation} value="cmkg">
                <IonLabel>cm/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={props.resetCalculation} value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    )
}

export default InputControl;