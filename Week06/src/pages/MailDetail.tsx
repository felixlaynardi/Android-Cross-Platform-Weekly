import { IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButtons  } from '@ionic/react';
import { useParams } from "react-router-dom";

export const MAIL_DATA = [
    {id: 'm1', subject: 'Magang MBKM sudah dimulai'},
    {id: 'm2', subject: 'Bimbingan Skripsi'},
    {id: 'm3', subject: 'Progress Laporan'}
]

const MailDetail: React.FC = () => {
    const mId = useParams<{mailId: string}>().mailId;
    const selectedMail = MAIL_DATA.find(m => m.id === mId);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>
                        {selectedMail ? selectedMail?.subject : 'No mail found'}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Mail ID: {mId}</h2>
            </IonContent>
        </IonPage>
    )
}

export default MailDetail;