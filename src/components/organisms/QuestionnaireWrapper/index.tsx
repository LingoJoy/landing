import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  EPayUrls,
} from "@/constants";
import { setLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { ILocation, setLocation } from "@/store/profile";
import { getQuestionnaire } from "@/store/questionnaire";
import { getServerLocalization } from "@/utils/apiHelpers";

import { TLocalizationQuestionnaireType } from "@/types";

interface IProps {
  children: ReactNode;
  isNoRedirect?: boolean;
}

const QuestionnaireWrapper: FC<IProps> = ({
  children,
  // isNoRedirect
}) => {
  const { motivation } = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const getLocation = async () => {
    try {
      const { data }: { data: { data: ILocation } } = await axios.get(
        `${import.meta.env.VITE_BACKEND_PAY_API_URL}${EPayUrls.LOCATION}`,
        {
          headers: {
            Authorization: import.meta.env.VITE_BACKEND_PAY_API_TOKEN,
          },
        },
      );
      dispatch(setLocation(data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getLang = async () => {
    try {
      const { localizationQuest } = await getServerLocalization();

      const locale = localStorage.getItem("localeQuest") || navigator.language.split("-")[0];

      const { data }: { data: TLocalizationQuestionnaireType } = await axios({
        url: `${locale}.json`,
        baseURL: localizationQuest,
      });

      dispatch(setLocalizationQuestionnaire(data));
    } catch (error) {
      console.error("Error fetching localization questionnaire data", error);
    }
  };

  useEffect(() => {
    getLang();
    getLocation();
  }, []);

  useEffect(() => {
    // if (!motivation.language && !isNoRedirect)
    //   navigate(ERoutes.QUESTIONNAIRE_START);
  }, [motivation]);

  return <>{children}</>;
};

export default QuestionnaireWrapper;
