import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon } from "@ionic/react"
import { calculatorOutline, refreshOutline } from 'ionicons/icons'
import { useRef, useState } from "react"
import CalculatedResults from '../components/CalculatedResults';

interface Calculator { }

const Calculator: React.FC<Calculator> = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [ statusBMI, setStatusBMI ] = useState<string>();
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight) return;

        const bmi = +enteredWeight / (+enteredHeight/100 * +enteredHeight/100);

        if(bmi < 18.5){
            setStatusBMI('Kurus');
        }
        else if(bmi < 25){
            setStatusBMI('Normal');
        }
        else if(bmi < 30){
            setStatusBMI('Gemuk');
        }
        else if(bmi > 30){
            setStatusBMI('Obesitas');
        }
        else{
            setStatusBMI('Invalid Value');
        }

        setCalculatedBMI(bmi);
    }
    const resetCalculation = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';

        setCalculatedBMI(undefined);
    }
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                        <IonInput ref={heightInputRef}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                        <IonInput ref={weightInputRef}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className="ion-text-left">
                    <IonButton onClick={calculateBMI}>
                        <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                        Calculate
                    </IonButton>
                </IonCol>
                <IonCol className="ion-text-right">
                    <IonButton onClick={resetCalculation}>
                        <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                        Reset
                    </IonButton>
                </IonCol>
            </IonRow>
            <CalculatedResults results={calculatedBMI} status={statusBMI}/>
        </IonGrid>
    )
}

export default Calculator;