import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonCard, IonButtons  } from '@ionic/react';
import { Route, Redirect } from "react-router-dom";

import { mailOutline, videocamOutline } from 'ionicons/icons';

import Mail from '../pages/Mail';
import Meet from '../pages/Meet';
import Spam from '../pages/Spam';

const MailTabs: React.FC = () => {
    return (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/mail" component={Mail}/>
            <Route exact path="/tabs/meet" component={Meet}/>
            <Route exact path="/tabs/spam" component={Spam}/>
            <Redirect exact from="/tabs" to="/tabs/mail" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
              <IonTabButton tab="mail" href="/tabs/mail">
                <IonIcon icon={mailOutline}/>
                <IonLabel>Mail</IonLabel>
              </IonTabButton>
              <IonTabButton tab="meet" href="/tabs/meet">
                <IonIcon icon={videocamOutline}/>
                <IonLabel>Meet</IonLabel>
              </IonTabButton>
          </IonTabBar>
        </IonTabs>
    )
}

export default MailTabs;