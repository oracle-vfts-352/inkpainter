import { createContext, useContext, useState } from "react";

const GalleryContext = createContext();

export function GalleryProvider({ children }){

    const [manageMode, setManageMode] = useState(false);

    return (

        <GalleryContext.Provider

            value={{

                manageMode,

                setManageMode

            }}

        >

            {children}

        </GalleryContext.Provider>

    );

}

export function useGallery(){

    return useContext(GalleryContext);

}