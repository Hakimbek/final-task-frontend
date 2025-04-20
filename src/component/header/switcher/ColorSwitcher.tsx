import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

export const ColorSwitcher = () => {
    const [theme, setTheme] = useLocalStorageState("theme", { defaultValue: "light" });

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <button onClick={toggleTheme} className="button-theme">
            <i className={`bi bi-${theme === "light" ? "sun" : "moon"}`}></i>
        </button>
    )
}
