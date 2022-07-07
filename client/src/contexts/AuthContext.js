import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        loadUser();
    }, []);

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            console.log(error);
            localStorage.removeItem([LOCAL_STORAGE_TOKEN_NAME]);
            setAuthToken(null);
            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    // Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);

            if (response.data.success) {
                // save the token in browser by local storage
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
                return error.response.data;
            } else
                return {
                    success: false,
                    msg: error.message,
                };
        }
    };

    // Register
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/register`,
                userForm
            );

            if (response.data.success) {
                // save the token in browser by local storage
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
                return error.response.data;
            } else
                return {
                    success: false,
                    msg: error.message,
                };
        }
    };

    // Context data
    const authContextData = { loginUser, authState, registerUser };

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
