import { IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonButtons, IonMenu, IonMenuButton } from '@ionic/react';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>
                        Settings
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonTitle>
                    Settings
                </IonTitle>
            </IonContent>
        </IonPage>
    )
}

export default Settings;