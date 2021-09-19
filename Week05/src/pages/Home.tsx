import { IonPage, IonButton, IonContent } from '@ionic/react';
import Header from '../components/Header';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header title={"Calculator"}/>
      <IonContent className="ion-padding">
        <h2>00000028641 - Felix Laynardi</h2>
        <IonButton expand="block" routerLink="/bmi">BMI Calculator</IonButton>
        <IonButton expand="block" routerLink="/bmr">BMR Calculator</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
