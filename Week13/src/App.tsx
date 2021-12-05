import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import BadMemories from './pages/BadMemories';
import GoodMemories from './pages/GoodMemories';

import { happyOutline, sadOutline, add } from 'ionicons/icons';
import NewMemory from './pages/NewMemory';
import MemoriesContext from './data/memories-context';
import { useEffect, useContext, useState } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Toast } from "@capacitor/toast";

import { Capacitor } from '@capacitor/core';

const App: React.FC = () => {
  const nullEntry: any[] = []
  const [notifications, setnotifications] = useState(nullEntry);

  useEffect( () =>{
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
      if (isPushNotificationsAvailable) {
          PushNotifications.checkPermissions().then((res) => {
              if (res.receive !== 'granted') {
                  PushNotifications.requestPermissions().then((res) => {
                  if (res.receive === 'denied') {
                      showToast('Push Notification permission denied');
                  }
                  else {
                      showToast('Push Notification permission granted');
                      register();
                  }
                  });
              }
              else {
                  register();
              }
          });
      }
  },[])

  const register = () => {
      console.log('Initializing HomePage');

      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
          (token: Token) => {
              showToast('Push registration success');
          }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
          (error: any) => {
              alert('Error on registration: ' + JSON.stringify(error));
          }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotificationSchema) => {
              setnotifications(notifications => [...notifications, { id: notification.id, title: notification.title, body: notification.body, type: 'foreground' }])
          }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: ActionPerformed) => {
              setnotifications(notifications => [...notifications, { id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body, type: 'action' }])
          }
      );
  }

  const showToast = async (msg: string) => {
      await Toast.show({
          text: msg
      })
  }

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC8JHu3xBK-ndfFXZYgyNXyh8juOExzq6Y",
    authDomain: "mobile-cross-platform-week11.firebaseapp.com",
    projectId: "mobile-cross-platform-week11",
    storageBucket: "mobile-cross-platform-week11.appspot.com",
    messagingSenderId: "231752266139",
    appId: "1:231752266139:web:c01e33dae58bb36142f13e"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  
  const memoriesCtx = useContext(MemoriesContext)
  const {initContext} = memoriesCtx;
  useEffect(() => {
    initContext();
  }, [initContext]);
  return (
    <IonApp>
      <IonReactRouter>
          <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/goodMemories" component={GoodMemories}/>
                  <Route exact path="/badMemories" component={BadMemories}/>
                  <Route exact path="/newMemory" component={NewMemory}/>
                  <Redirect exact from="/" to="/goodMemories" />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="mail" href="/goodMemories">
                        <IonIcon icon={happyOutline}></IonIcon>
                        <IonLabel>Good Memories</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="meet" href="/badMemories">
                        <IonIcon icon={sadOutline}></IonIcon>
                        <IonLabel>Bad Memories</IonLabel>
                    </IonTabButton>
                </IonTabBar>
          </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
