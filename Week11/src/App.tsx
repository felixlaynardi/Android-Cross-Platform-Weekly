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
import { useEffect, useContext } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const App: React.FC = () => {
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
