import { useTranslation } from "react-i18next";
import { setSearch, selectSearch } from "../../app/slice/searchSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hook/hooks.ts";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export const Search = () => {
    const { t } = useTranslation();
    const search = useAppSelector(selectSearch);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className="d-inline-block rounded-pill border ps-3">
            <input
                type="text"
                className="search-input"
                placeholder={t("search")}
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <button
                className="button-theme"
                onClick={() => navigate("/home")}
            >
                <i className="bi bi-search"></i>
            </button>
        </div>
    )
}
