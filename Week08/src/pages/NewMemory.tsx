import { Directory, Filesystem } from "@capacitor/filesystem"
import { base64FromPath } from "@ionic/react-hooks/filesystem"
import { useRef, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";

import { IonContent, IonRow, IonBackButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonButton, IonButtons, IonIcon, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import MemoriesContext from '../data/memories-context'

const NewMemory: React.FC = () => {
    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>();
    const titleRef = useRef<HTMLIonInputElement>(null);

    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();

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
        console.log(!chosenMemoryType)
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

        memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);

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