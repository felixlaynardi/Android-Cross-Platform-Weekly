import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonAlert } from "@ionic/react"
import { useRef, useState } from "react"
import BmiResult from './BmiResult';
import BMIControls from "./BMIControls";
import InputControl from "./InputControl";

interface Calculator { }

const Calculator: React.FC<Calculator> = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [ statusBMI, setStatusBMI ] = useState<string>();
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const [ error, setError ] = useState<string>();
    const [ calcUnits, setCalcUnits ] = useState<'cmkg' | 'ftlbs'>('cmkg');

    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || +enteredWeight <= 0 || +enteredHeight <= 0 ||
            typeof(enteredWeight) == 'number' || typeof(enteredHeight) == 'number'
        ){
            setError('Please enter a valid (non-negative) input number');
            return;
        }

        let bmi = 0;
        // Change bmi based on calcUnits
        if(calcUnits === 'ftlbs'){
            bmi = +enteredWeight/2.2 / (+enteredHeight/100/0.0328 * +enteredHeight/100/0.0328);
        }
        else{
            bmi = +enteredWeight / (+enteredHeight/100 * +enteredHeight/100);
        }
        
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
    const clearError = () => {
        setError('');
    }
    const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue)
    }
    return (
        <>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[
                    {text: 'Okay', handler: clearError}
                ]}
            />
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <InputControl resetCalculation={resetCalculation} selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                        <IonItem>
                            <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                            <IonInput ref={heightInputRef}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                            <IonInput ref={weightInputRef}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <BMIControls onCalculate={calculateBMI} onReset={resetCalculation}/>
                <BmiResult results={calculatedBMI} status={statusBMI}/>
            </IonGrid>
        </>
    )
}

export default Calculator;