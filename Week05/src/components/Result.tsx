import './Result.css'
import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react"

interface Result { 
    type : string | undefined
    results : number | undefined
    status : string | undefined
    sedentary : number | undefined
    exercise13 : number | undefined
    exercise45 : number | undefined
    dailyExercise : number | undefined
    intenseExercise : number | undefined
}

const Result: React.FC<Result> = (props) => {
    if(props.results == undefined){
        return null
    }
    if(props.type == 'BMI'){
        if(props.status == 'Obesitas'){
            return (
                <IonRow>
                    <IonCol>
                        <IonCard id="result">
                            <IonCardContent className="ion-text-center ion-card-danger">
                                <h2>{props.results}</h2>
                                <h1>{props.status}</h1>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            )
        }
        else if(props.status == 'Normal'){
            return (
                <IonRow>
                    <IonCol>
                        <IonCard id="result">
                            <IonCardContent className="ion-text-center ion-card-success">
                                <h2>{props.results}</h2>
                                <h1>{props.status}</h1>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            )
        }
        else{
            return (
                <IonRow>
                    <IonCol>
                        <IonCard id="result">
                            <IonCardContent className="ion-text-center ion-card-warning">
                                <h2>{props.results}</h2>
                                <h1>{props.status}</h1>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            )
        }
    }
    else{
        return (
            <IonRow>
                <IonCol>
                    <IonCard id="result">
                        <IonCardContent className="ion-text-center">
                            <h2>BMR = {props.results} Calories/day</h2>
                            <h1>Daily calorie needs based on activity level</h1>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    <b>Activity Level</b>
                                </IonCol>
                                <IonCol>
                                    <b>Calorie</b>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    Sedentary: little or no exercise
                                </IonCol>
                                <IonCol>
                                    {props.sedentary}
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    Exercise: 1-3 times/week
                                </IonCol>
                                <IonCol>
                                    {props.exercise13}
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    Exercise: 4-5 times/week
                                </IonCol>
                                <IonCol>
                                    {props.exercise45}
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    Daily Exercise or Intense Exercise 3-4 times/week
                                </IonCol>
                                <IonCol>
                                    {props.dailyExercise}
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-text-left">
                                <IonCol>
                                    Intense Exercise: 6/7 times/week
                                </IonCol>
                                <IonCol>
                                    {props.intenseExercise}
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
        )
    }
}

export default Result; 