import { useQuery } from "react-query";
import { User } from "@/types/user.type";
import ApiClient from "@/services/api-client";
import { useAuthStore } from "@/stores/auth-store";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import LoadingTopbar from "@/components/core/loading-topbar";

// ------------------------------------------------------------

type AuthContext = {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    setToken: (token: string | null) => void;
    logout: () => void;
};

// ------------------------------------------------------------

const AuthContext = createContext<AuthContext | null>(null);

// ------------------------------------------------------------

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { token, setToken } = useAuthStore();

    const currentUser = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => {
            ApiClient.setAuthToken({ type: "Bearer", token: token });
            return ApiClient.user.current();
        },
        onSuccess: (res) => {
            setUser(res.data.data);
        },
        onError: () => {
            setToken(null);
        },
        enabled: token !== null,
    });

    const logout = () => {
        setToken(null);
        setUser(null);
        toast.success("Logout successful");
    };

    return (
        <AuthContext.Provider
            value={{
                user: user,
                isLoading: currentUser.isLoading,
                isError: currentUser.isError,
                setToken: setToken,
                logout: logout,
            }}
        >
            {currentUser.isLoading && <LoadingTopbar />}
            {children}
        </AuthContext.Provider>
    );
};

// ------------------------------------------------------------

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
