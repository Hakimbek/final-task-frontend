import { HomeButton } from "./button/HomeButton.tsx";
import { Search } from "../search/Search.tsx";
import { ColorSwitcher } from "./switcher/ColorSwitcher.tsx";
import { LanguageSwitcher } from "./switcher/LanguageSwitcher.tsx";
import { LoginButton } from "./button/LoginButton.tsx";
import { SignupButton } from "./button/SignupButton.tsx";
import { LogoutButton } from "./button/LogoutButton.tsx";
import { ProfileButton } from "./button/ProfileButton.tsx";
import { Spinner } from "reactstrap";
import { useAuth } from "../../app/hook/useAuth.ts";
import { AdminButton } from "./button/AdminButton.tsx";
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
                {user?.isAdmin && <AdminButton />}
                {
                    isLoading
                        ? <Spinner size="sm" color="warning" type="grow" />
                        : user ? (
                            <>
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
