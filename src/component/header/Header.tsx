import { HomeButton } from "./buttons/HomeButton.tsx";
import { Search } from "../search/Search.tsx";
import { ColorSwitcher } from "./switcher/ColorSwitcher.tsx";
import { LanguageSwitcher } from "./switcher/LanguageSwitcher.tsx";
import { LoginButton } from "./buttons/LoginButton.tsx";
import { SignupButton } from "./buttons/SignupButton.tsx";
import { LogoutButton } from "./buttons/LogoutButton.tsx";
import { ProfileButton } from "./buttons/ProfileButton.tsx";
import { Spinner } from "reactstrap";
import { useAuth } from "../../app/hook/useAuth.ts";
import { AdminButton } from "./buttons/AdminButton.tsx";
import "./Header.css";

export const Header = () => {
    const { isLoading, user } = useAuth();

    return (
        <header className="border-bottom p-3 header-wrapper z-1">
            <HomeButton />
            <div className="d-flex align-items-center gap-4">
                <Search />
                <ColorSwitcher />
                <LanguageSwitcher />
                {
                    isLoading
                        ? <Spinner size="sm" color="warning" type="grow" />
                        : user ? (
                            <>
                                {user?.isAdmin && <AdminButton />}
                                <LogoutButton />
                                <ProfileButton />
                            </>
                        ) : (
                            <>
                                <LoginButton />
                                <SignupButton />
                            </>
                        )
                }
            </div>
        </header>
    )
}
