import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonAlert, IonRadioGroup, IonRadio, IonListHeader, IonContent } from "@ionic/react"
import { useRef, useState } from "react"
import Result from './Result';
import Controls from "./Controls";
import Header from './Header';
import InputControl from "./InputControl";

interface BMRCalculator { }

const BMRCalculator: React.FC<BMRCalculator> = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [gender, setGender] = useState<string>();
    const [ sedentary, setSedentary ] = useState<number>();
    const [ exercise13, setExercise13 ] = useState<number>();
    const [ exercise45, setExercise45 ] = useState<number>();
    const [ dailyExercise, setDailyExercise ] = useState<number>();
    const [ intenseExercise, setintenseExercise ] = useState<number>();
    const ageInputRef = useRef<HTMLIonInputElement>(null);
    const genderInputRef = useRef<HTMLIonRadioGroupElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const [ error, setError ] = useState<string>();
    const [ calcUnits, setCalcUnits ] = useState<'cmkg' | 'ftlbs'>('cmkg');

    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;
        const enteredAge = ageInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || !enteredAge || +enteredWeight <= 0 || +enteredHeight <= 0 || +enteredAge <= 0 ||
            typeof(enteredWeight) == 'number' || typeof(enteredHeight) == 'number' || typeof(enteredAge) == 'number'
        ){
            setError('Please enter a valid (non-negative) input number');
            return;
        }

        if(!gender){
            setError('Please select a gender');
            return;
        }

        let bmr = 0;
        // Change bmr based on calcUnits
        if(gender == 'Male'){
            if(calcUnits === 'ftlbs'){
                bmr = 66 + (13.7 * +enteredWeight/2.2) + (5 * +enteredHeight/0.0328) - (6.8 * +enteredAge);
            }
            else{
                bmr = 66 + (13.7 * +enteredWeight) + (5 * +enteredHeight) - (6.8 * +enteredAge);
            }
        }
        else{
            if(calcUnits === 'ftlbs'){
                bmr = 655 + (9.6 * +enteredWeight/2.2) + (1.8 * +enteredHeight/0.0328) - (4.7 * +enteredAge);
            }
            else{
                bmr = 655 + (9.6 * +enteredWeight) + (1.8 * +enteredHeight) - (4.7 * +enteredAge);
            }
        }

        setSedentary(bmr * 1.2);
        setExercise13(bmr * 1.375);
        setExercise45(bmr * 1.55);
        setDailyExercise(bmr * 1.725);
        setintenseExercise(bmr * 1.9);

        setCalculatedBMI(bmr);
    }
    const resetCalculation = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
        ageInputRef.current!.value = '';

        setCalculatedBMI(undefined);
        genderInputRef.current!.value = '';
    }
    const clearError = () => {
        setError('');
    }
    const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue)
    }
    return (
        <>
            <Header title={"BMR Calculator"}/>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[
                    {text: 'Okay', handler: clearError}
                ]}
            />
            <IonContent overflow-scroll="true">
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                            <InputControl resetCalculation={resetCalculation} selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                            <IonItem>
                                <IonLabel position="floating">Age</IonLabel>
                                <IonInput ref={ageInputRef}></IonInput>
                            </IonItem>
                            <IonRadioGroup ref={genderInputRef} onIonChange={e => setGender(e.detail.value)}>
                                <IonListHeader>
                                    <IonLabel>Gender</IonLabel>
                                </IonListHeader>
                                <IonItem>
                                    <IonLabel>Male</IonLabel>
                                    <IonRadio slot="start" value="Male" />
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Female</IonLabel>
                                    <IonRadio slot="start" value="Female" />
                                </IonItem>
                            </IonRadioGroup>
                            <IonItem>
                                <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                                <IonInput ref={heightInputRef}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                                <IonInput ref={weightInputRef}></IonInput>
                            </IonItem>
                            <Controls onCalculate={calculateBMI} onReset={resetCalculation}/>
                            <Result results={calculatedBMI} status={undefined} sedentary={sedentary} exercise13={exercise13} 
                                exercise45={exercise45} dailyExercise={dailyExercise} intenseExercise={intenseExercise} type={"BMR"}/>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </>
    )
}

export default BMRCalculator;