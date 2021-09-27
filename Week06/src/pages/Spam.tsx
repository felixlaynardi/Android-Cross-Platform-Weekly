import { IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonMenu, IonMenuButton } from '@ionic/react';

const Spam: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>
                        Spam
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonTitle>
                    Spam
                </IonTitle>
            </IonContent>
        </IonPage>
    )
}

export default Spam;