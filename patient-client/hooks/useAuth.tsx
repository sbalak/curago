import  { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    authState: { token: null, userId: null, authenticated: null }, login: async () => {}, verify: async () => {}, logout: async () => {}
}

type AuthContextType = {
    authState: { token: string | null, userId: string | null, authenticated: boolean | null };
    login: (username: string) => Promise<any>;
    verify: (username: string, code: string) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>(initialState);

interface Props extends PropsWithChildren {}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authState, setAuthState] = useState<{ token: string | null, userId: string | null, authenticated: boolean | null }>({ token: null, userId: null, authenticated: null });

    useEffect(() => {
        const loadAccessToken = async () => {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            const userId = await SecureStore.getItemAsync('userId');
            
            console.log("hooks/useAuth.tsx/useEffect(): line-31 -> current accessToken: " + accessToken);
            console.log("hooks/useAuth.tsx/useEffect(): line-32 -> current refreshToken: " + refreshToken);
            console.log("hooks/useAuth.tsx/useEffect(): line-33 -> current userId: " + userId);

            if (accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                setAuthState({
                    token: accessToken,
                    userId: userId,
                    authenticated: true
                });
                
                console.log("hooks/useAuth.tsx/useEffect(): line-44 -> Authenticated with a valid accessToken");
            }
            else {
                setAuthState({
                    token: null, 
                    userId: null,
                    authenticated: false
                });

                console.log("hooks/useAuth.tsx/useEffect(): line-53 -> Not authenticated and invalidated accessToken");
            }  
        };

        axios.interceptors.request.use(async (request) => {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            console.log("hooks/useAuth.tsx/useEffect(): line-59 -> Request interceptor using the current accessToken")
            if (accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
            return request;
          }, error => {
            console.log("hooks/useAuth.tsx/useEffect(): line-65 -> Request interceptor error and call is rejected")
            return Promise.reject(error);
          });

        // Add a response interceptor
        axios.interceptors.response.use(
            response => response, 
            async (error) => {
                const originalRequest = error.config;
                let retry = 0;
                if (error.response.status === 401 && !originalRequest._retry) {
                    const accessToken = await SecureStore.getItemAsync('accessToken');                    
                    const refreshToken = await SecureStore.getItemAsync('refreshToken');
                    
                    console.log("hooks/useAuth.tsx/useEffect(): line-79 -> Response interceptor using the current tokens to request a new token")

                    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, { accessToken, refreshToken });

                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                    await SecureStore.setItem('accessToken', response.data.accessToken);
                    await SecureStore.setItem('refreshToken', response.data.refreshToken);

                    console.log("hooks/useAuth.tsx/useEffect(): line-89 -> New access token: " + response.data.accessToken)
                    console.log("hooks/useAuth.tsx/useEffect(): line-90 -> New refresh token: " + response.data.refreshToken)

                    originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

                    const retryRequest = await axios(originalRequest);

                    return retryRequest; // Retry the original request with the new access token.
                }
                console.log("hooks/useAuth.tsx/useEffect(): line-98 -> if condition skipped in response interceptor and rejecting with an error")
                return Promise.reject(error);
            }
        );

        loadAccessToken();
    }, []);

    const login = async (username: string) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login?username=${username}`);
            const data = await response.data;

            console.log("hooks/useAuth.tsx/login(): line-111 -> Login response: " + JSON.stringify(data))

            if (data.status === 401){
                return data;
            }
            
            return data;
        } catch (error) {
            console.log("hooks/useAuth.tsx/login(): line-119 -> Login error: " + JSON.stringify((error as any).response.data))
            return { error: true, message: (error as any).response.data };
        }
    }

    const verify = async (username: string, code: string) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/verify?username=${username}&code=${code}`);
            const data = await response.data;

            console.log("hooks/useAuth.tsx/verify(): line-129 -> Verify response: " + JSON.stringify(data))

            if (data.status === 401){
                return data;
            }

            const decoded = jwtDecode(data.accessToken);
            
            await SecureStore.setItem('accessToken', data.accessToken);
            await SecureStore.setItem('refreshToken', data.refreshToken);
            await SecureStore.setItem('userId', String(decoded.Id));

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

            setAuthState({
                token: data.accessToken,
                userId: decoded.Id,
                authenticated: true
            });

            return data;
        } catch (error) {
            console.log("hooks/useAuth.tsx/verify(): line-151 -> Verify error: " + JSON.stringify((error as any).response.data))
            return { error: true, message: (error as any).response.data };
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('userId');

            setAuthState({
                token: null,
                userId: null,
                authenticated: false
            });      
            
            console.log("hooks/useAuth.tsx/logout(): line-168 -> Logout successful")

            router.replace('/login');  
        } catch (error) {
            console.log("hooks/useAuth.tsx/logout(): line-172 -> Logout error: " + JSON.stringify((error as any).response.data))
            return { error: true, message: (error as any).response.data };
        }
    }
    
    return <AuthContext.Provider value={{ authState, login, verify, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth can be accessible only within the AuthProvider')
    }

    return context;
}