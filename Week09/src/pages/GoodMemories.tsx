import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useContext } from 'react';
import { add } from 'ionicons/icons';

import './Memories.css'

import MemoriesContext from '../data/memories-context'

import { GoogleMap, Marker } from "@react-google-maps/api";

const GoodMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good');

    return (
        <IonPage>
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="fabButton">
                <IonFabButton routerLink={'/newMemory'}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Good Memories
                    </IonTitle>
                    <IonButton slot="end" routerLink={'/newMemory'} className="headerButton">
                        <IonIcon icon={add} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No good memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {goodMemories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard>
                                    <img src={memory.base64Url} alt={memory.title} />
                                    <GoogleMap
                                        mapContainerStyle={{
                                            width: '100%',
                                            height: '15rem'
                                        }}
                                        center={{ lat: memory.lat, lng: memory.lng }}
                                        zoom={10}>
                                        <Marker position={{ lat: memory.lat, lng: memory.lng }} />
                                    </GoogleMap>
                                    <IonCardHeader>
                                        <IonCardTitle>{memory.title}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default GoodMemories;