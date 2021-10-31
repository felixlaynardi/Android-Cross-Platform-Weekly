import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [lat, setLat] = useState<number>(-6.257377926995551);
  const [lng, setLng] = useState<number>(106.61829861017398);
  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){ setLat(e.latLng?.lat()); }
    if(e.latLng?.lng()){ setLng(e.latLng?.lng()); }
  }
  const trackPosition = async() => {
    const data = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 1000
    }, (position, err) => {
      if(position){
        console.log(position);
      }
    })
  }
  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});

    console.log('Current position: ', coordinates);
    console.log('Lat: ', coordinates.coords.latitude);
    console.log('Long: ', coordinates.coords.longitude);
  }
  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
        <LoadScript googleMapsApiKey="AIzaSyDV37sv03ne8yfyIdY2-_Z4YjeNA3QRcro">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat:lat, lng:lng}}
            zoom={10}>
            {}
            <></>
            <Marker position={{lat:lat, lng:lng}}/>
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
