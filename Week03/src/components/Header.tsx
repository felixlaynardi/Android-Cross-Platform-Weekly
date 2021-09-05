import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface Header { }

const Header: React.FC<Header> = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>BMI Calculator</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;