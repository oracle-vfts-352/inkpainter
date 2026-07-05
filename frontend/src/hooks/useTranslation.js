import { useApp } from "../context/AppContext";

import en from "../i18n/en";
import jp from "../i18n/jp";

export function useTranslation(){

    const {

        language

    } = useApp();

    const t =

        language === "jp"

        ? jp

        : en;

    return {

        language,

        t

    };

}