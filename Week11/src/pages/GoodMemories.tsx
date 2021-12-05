import { IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useState, useEffect } from 'react';
import { add } from 'ionicons/icons';

import './Memories.css'

import {Memory} from '../data/memories-context'

import { GoogleMap, Marker } from "@react-google-maps/api";

import { collection, getDocs, getFirestore } from 'firebase/firestore';

const GoodMemories: React.FC = () => {
    const db = getFirestore();

    const [goodMemories, setGoodMemories] = useState([] as any)

    useEffect(() => {
        const getData = async() => {
            const querySnapshot = await getDocs(collection(db, "memories"));
            console.log(querySnapshot)

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().type}`)
                console.log(doc)

                if(doc.data().type === 'good'){
                    let memory : Memory = {
                        id: doc.data().id,
                        title: doc.data().title,
                        type: doc.data().type,
                        imgUrl: doc.data().imgUrl,
                        imagePath: undefined,
                        base64Url: undefined,
                        lat: parseFloat(doc.data().lat),
                        lng: parseFloat(doc.data().lng)
                    }
                    setGoodMemories((oldArray : any) => [...oldArray, memory])
                }
            })
        }

        getData();

    }, []);

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
                    {goodMemories.map((memory : any) => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard className="ion-text-center">
                                    <img src={memory.imgUrl} alt={memory.title} />
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