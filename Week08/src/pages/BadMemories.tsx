import { IonTabBar, IonTabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonFab, IonFabButton, IonMenu, IonLabel, IonButton } from '@ionic/react';
import { add } from 'ionicons/icons';

import './Memories.css'

const BadMemories: React.FC = () => {
    return (
        <IonPage>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton routerLink={'/newMemory'}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Bad Memories
                    </IonTitle>
                    <IonButton slot="end" routerLink={'/newMemory'}>
                        <IonIcon icon={add} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default BadMemories;