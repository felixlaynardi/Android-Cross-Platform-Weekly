import { IonPage } from '@ionic/react';
import Header from '../components/Header';
import Calculator from '../components/Calculator';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header/>
      <Calculator/>
    </IonPage>
  );
};

export default Home;
