import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { add } from 'ionicons/icons';

import './Memories.css'

import {Memory} from '../data/memories-context'

import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from 'axios';

const BadMemories: React.FC = () => {
    const url = "http://localhost/Web-Programming/Week10-API/select_all_memories.php"

    const [badMemories, setBadMemories] = useState([] as any)

    useEffect(() => {
        axios.get(url).then((response) => {
            if(response.data.success === 1){
                for(let i = 0; i < response.data.memories.length; i++){
                    if(response.data.memories[i].type == 'bad'){
                        let memory : Memory = {
                            id: response.data.memories[i].id,
                            title: response.data.memories[i].title,
                            type: response.data.memories[i].type,
                            imagePath: response.data.memories[i].path,
                            base64Url: response.data.memories[i].base64Url,
                            lat: parseFloat(response.data.memories[i].lat),
                            lng: parseFloat(response.data.memories[i].lng)
                        }
                        setBadMemories((oldArray : any) => [...oldArray, memory])
                    }
                }
            }
        })
    }, []);

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
            <IonContent>
                <IonGrid>
                    {badMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No bad memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {badMemories.map((memory : any) => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard className="ion-text-center">
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

export default BadMemories;