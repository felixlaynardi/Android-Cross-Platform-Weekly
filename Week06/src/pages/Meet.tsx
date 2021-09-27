import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonAvatar, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';

import { ban, trash, create } from 'ionicons/icons';
import { useRef } from 'react';

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', avatar: 'https://awsimages.detik.net.id/community/media/visual/2019/04/30/fd3470b3-4473-4e0e-b136-205aff5a9008_43.jpeg?w=700&q=90'},
    {id: 'f2', name: 'John Ness', avatar: 'https://foto.kontan.co.id/beQoHuT4R4XOgvrOwMjN0YulpUI=/smart/2020/09/14/1433117057p.jpg'},
    {id: 'f3', name: 'John Doe', avatar: 'https://awsimages.detik.net.id/community/media/visual/2021/09/20/thor-god-of-war-ragnarok_169.jpeg?w=700&q=90'}
]

const Meet: React.FC = () => {
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const callFriendHandler = () => {
        console.log('Calling...')
    }
    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log('Blocking...')
    }
    const deleteFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log('Deleting...')
    }
    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log('Editing...')
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>
                        Meet
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {FRIENDS_DATA.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon slot="icon-only" icon={ban}/>
                                </IonItemOption>
                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon slot="icon-only" icon={trash}/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon slot="icon-only" icon={create}/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem key={friend.id} lines="full" button detail={true} onClick={callFriendHandler}>
                                <IonAvatar slot="start">
                                    <img src={friend.avatar} />
                                </IonAvatar>
                                <IonLabel>
                                    {friend.name}
                                </IonLabel>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Meet;