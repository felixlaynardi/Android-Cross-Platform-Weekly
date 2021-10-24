import { Directory, Filesystem } from "@capacitor/filesystem"
import { base64FromPath } from "@ionic/react-hooks/filesystem"
import { useRef, useState } from 'react';

import { IonRow, IonBackButton, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonButton, IonButtons, IonIcon, IonLabel } from '@ionic/react';
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const NewMemory: React.FC = () => {
    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.type;
        setChosenMemoryType(selectedMemoryType);
    }
    const [takenPhoto, setTakenPhoto] = useState<{
        path: string;
        preview: string;
    }>();
    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(photo);

        if(!photo || !photo.path || !photo.webPath){
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
    };
    return (
        <IonPage>
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
            <IonRow className="ion-margin-top">
                <IonCol className="ion-text-center">
                    <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                </IonCol>
            </IonRow>
        </IonPage>
    )
}

export default NewMemory;