import { useAppSelector } from "./hooks.ts";
import { useGetUserByIdQuery } from "../api/userApi.ts";
import { selectToken, selectUserId } from "../slice/authSlice.ts";

export const useAuth = () => {
    const token = useAppSelector(selectToken);
    const userId = useAppSelector(selectUserId);
    const { data: user, isLoading } = useGetUserByIdQuery(userId!, { skip: !userId || !token });
    const isLoggedIn = Boolean(token && user);

    if (isLoggedIn) return { user, isLoading };

    return { user: null, isLoading };
};