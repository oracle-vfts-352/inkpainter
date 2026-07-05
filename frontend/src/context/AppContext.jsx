import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [manageMode, setManageMode] = useState(false);

    const [watermark, setWatermark] = useState(true);

    const [language, setLanguage] = useState(

        localStorage.getItem("language") || "en"

    );

    useEffect(() => {

        localStorage.setItem("language", language);

        document.body.classList.remove(

            "lang-en",
            "lang-jp"

        );

        document.body.classList.add(

            language === "jp"
                ? "lang-jp"
                : "lang-en"

        );

    }, [language]);

    return (

        <AppContext.Provider

            value={{

                manageMode,
                setManageMode,

                watermark,
                setWatermark,

                language,
                setLanguage

            }}

        >

            {children}

        </AppContext.Provider>

    );

}

export function useApp() {

    return useContext(AppContext);

}