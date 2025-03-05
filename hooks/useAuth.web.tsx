import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

const initialState = {
  authState: { token: null, userId: null, authenticated: null },
  login: async () => {},
  verify: async () => {},
  logout: async () => {},
};

type AuthContextType = {
  authState: {
    token: string | null;
    userId: string | null;
    authenticated: boolean | null;
  };
  login: (username: string) => Promise<any>;
  verify: (username: string, code: string) => Promise<any>;
  logout: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType>(initialState);

interface Props extends PropsWithChildren {}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    userId: string | null;
    authenticated: boolean | null;
  }>({ token: null, userId: null, authenticated: null });

  useEffect(() => {
    const loadAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");

      console.log("useEffect -> current accessToken: ", accessToken);
      console.log("useEffect -> current refreshToken: ", refreshToken);
      console.log("useEffect -> current userId: ", userId);

      if (accessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setAuthState({
          token: accessToken,
          userId: userId,
          authenticated: true,
        });

        console.log("Authenticated with a valid accessToken");
      } else {
        setAuthState({
          token: null,
          userId: null,
          authenticated: false,
        });

        console.log("Not authenticated, invalidated accessToken");
      }
    };

    axios.interceptors.request.use(
      (request) => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("Request interceptor using current accessToken");
        if (accessToken) {
          request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return request;
      },
      (error) => {
        console.log("Request interceptor error, rejecting call");
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log("Refreshing token...");
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");

          try {
            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
              { accessToken, refreshToken }
            );

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            console.log("New access token: ", response.data.accessToken);
            console.log("New refresh token: ", response.data.refreshToken);

            originalRequest._retry = true;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed, logging out...");
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    loadAccessToken();
  }, []);

  const login = async (username: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login?username=${username}`
      );
      const data = response.data;

      console.log("Login response: ", data);

      if (data.status === 401) {
        return data;
      }

      return data;
    } catch (error) {
      console.log("Login error: ", (error as any).response?.data);
      return { error: true, message: (error as any).response?.data };
    }
  };

  const verify = async (username: string, code: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/verify?username=${username}&code=${code}`
      );
      const data = response.data;

      console.log("Verify response: ", data);

      if (data.status === 401) {
        return data;
      }

      const decoded: any = jwtDecode(data.accessToken);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", String(decoded.Id));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      setAuthState({
        token: data.accessToken,
        userId: decoded.Id,
        authenticated: true,
      });

      return data;
    } catch (error) {
      console.log("Verify error: ", (error as any).response?.data);
      return { error: true, message: (error as any).response?.data };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      setAuthState({
        token: null,
        userId: null,
        authenticated: false,
      });

      console.log("Logout successful");
      router.replace("/login");
    } catch (error) {
      console.log("Logout error: ", (error as any).response?.data);
      return { error: true, message: (error as any).response?.data };
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, verify, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
