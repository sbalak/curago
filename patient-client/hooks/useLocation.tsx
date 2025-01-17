import  { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from "expo-location";
import { useAuth } from './useAuth';

const initialState = {
    locationState: { locality: null, latitude: null, longitude: null }, setLocality: async () => {}
}

type LocationContextType = {
    locationState: { locality: string | null, latitude: string | null, longitude: string | null };
    setLocality: () => Promise<any>;
}

const LocationContext = createContext<LocationContextType>(initialState);

interface Props extends PropsWithChildren {}

const LocationProvider: React.FC<Props> = ({ children }) => {
    const { authState } = useAuth();
    const [locationState, setLocationState] = useState<{ locality: string | null, latitude: string | null, longitude: string | null }>({ locality: "Loading...", latitude: null, longitude: null });
    
    useEffect(() => {
        const loadLocality = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
              // Please grant location permissions
              return;
            }
            
            await setLocality();
          }
          loadLocality();
    }, []);

    const setLocality = async () => {
        try {
            let geocode = await Location.getCurrentPositionAsync({});
            let address = await Location.reverseGeocodeAsync({
              longitude: geocode.coords.longitude,
              latitude: geocode.coords.latitude
            });
            
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Staff/SetCoordinates?staffId=${authState.userId}&latitude=${geocode.coords.latitude}&longitude=${geocode.coords.longitude}`); 
            
            setLocationState({
                locality: address[0].district,
                latitude: String(geocode.coords.latitude),
                longitude: String(geocode.coords.longitude)
            });

            return response;
        } catch (error) {
        }
    }

    return <LocationContext.Provider value={{ locationState, setLocality }}>{children}</LocationContext.Provider>
}

export default LocationProvider;

export const useLocation = () => {
    const context = useContext(LocationContext);

    if (!context) {
        throw new Error('useLocation can be accessible only within the LocationProvider')
    }

    return context;
}