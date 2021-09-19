import { IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';

interface Header { 
    title : string 
}

const Header: React.FC<Header> = (props) => {
    if(props.title != "Calculator"){
        return (
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="home" />
                    </IonButtons>
                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
        )
    }
    else{
        return (
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    </IonButtons>
                    <IonTitle>{props.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
        )
    }
}

export default Header;