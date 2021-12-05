import { Directory, Filesystem } from "@capacitor/filesystem"
import { base64FromPath } from "@ionic/react-hooks/filesystem"
import { useRef, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";

import { IonContent, IonRow, IonBackButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonButton, IonButtons, IonIcon, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { GoogleMap, Marker } from "@react-google-maps/api";

import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewMemory: React.FC = () => {
    const db = getFirestore();

    const storage = getStorage();

    const [lat, setLat] = useState<number>(-6.2573)
    const [lng, setLng] = useState<number>(106.6182)

    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>();
    const titleRef = useRef<HTMLIonInputElement>(null);

    const history = useHistory();

    const selectPos = (e: google.maps.MapMouseEvent) => {
        if(e.latLng?.lat()) { setLat(e.latLng?.lat()); }
        if(e.latLng?.lng()) { setLng(e.latLng?.lng()); }
    }

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    }

    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined;
        preview: string;
    }>();
    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });

        if(!photo || !photo.webPath){
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath
        });
    }
    const addMemoryHandler = async () => {
        const enteredTitle = titleRef.current?.value;
        if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
            return;
        }
        
        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });
        
        const addData = async() => {
            try {
                let response = await fetch(base64);
                let data = await response.blob();
                let metadata = {
                    type: 'image/jpeg'
                };
                let file = new File([data], fileName, metadata);

                const storageRef = ref(storage, fileName)
                const uploadTask = uploadBytesResumable(storageRef, file as Blob)
                
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    console.log('Error uploading file, err:', error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('Upload file successful')
                        console.log('File available at', downloadURL);

                        addDoc(collection(db, "memories"), {
                            title: enteredTitle.toString(),
                            type: chosenMemoryType,
                            imgUrl: downloadURL.toString(),
                            lat: lat,
                            lng: lng
                        })
                        console.log('Document upload successful');
                    });
                }
                );

            } catch(e) {
                console.error('Error adding document, with err: ', e);
            }
        }

        addData();

        history.length > 0 ? history.goBack() : history.replace('/goodMemories');
    };
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
                        <IonTitle>
                            Add New Memory
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="image-preview">
                            {!takenPhoto && <h3>No photo chosen.</h3>}
                            {takenPhoto && <img src={takenPhoto.preview} alt="Preview"/>}
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera}/>
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-padding">
                    <IonInput placeholder="Memory Title" type="text" ref={titleRef}></IonInput>
                </IonRow>
                <IonRow className="ion-padding">
                    <IonCol>
                        <IonLabel>Memory Type</IonLabel>
                        <IonSelect onIonChange={selectMemoryTypeHandler} placeholder="Memory Type">
                            <IonSelectOption value="good">Good Memory</IonSelectOption>
                            <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <GoogleMap
                        onClick={selectPos}
                        mapContainerStyle={{
                            width: '100%',
                            height: '30rem'
                        }}
                        center={{ lat: lat, lng: lng }}
                        zoom={10}>
                        <Marker position={{ lat: lat, lng: lng }} />
                    </GoogleMap>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default NewMemory;