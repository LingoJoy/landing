import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getToken } from "@/utils/AxiosConfig";
import { ERoutes, ETranslate, EUrls } from "@/constants";
import { User } from "@/store/auth/query";
import axiosConfig from "@/utils/AxiosConfig";
import { setProfile } from "@/store/profile";
import { getServerLocalization } from "@/utils/apiHelpers";
import { setLocalization } from "@/store/localization";

import { TLocalizationType } from "@/types";

interface IProps {
  children: ReactNode;
}

interface IProfileResponse {
  data: {
    user: User;
  };
}

const MILLISECONDS_IN_DAY = 86400000;

const AuthContainer: FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const { data }: IProfileResponse = await axiosConfig.get(EUrls.USERS_PROFILE);
      dispatch(setProfile(data.user));

      const { localization } = await getServerLocalization();

      const { data: dataLocale }: { data: TLocalizationType } = await axios.get(
        `${localization}/${data.user.locale || ETranslate.ENGLISH}.json`
      );

      dispatch(setLocalization(dataLocale));
    } catch (error) {
      console.error("Error fetching profile and localization", error);
    }
  };

  useEffect(() => {
    const localLoginDate = localStorage.getItem("LingoJoyLoginDate");
    const sessionLogin = sessionStorage.getItem("LingoJoyLogin");

    const token = getToken();

    if (!token || (!sessionLogin && !localLoginDate))
      return navigate(ERoutes.QUESTIONNAIRE_START);

    if (localLoginDate) {
      const newDate = new Date().valueOf();
      const oldDate = new Date(localLoginDate).valueOf();

      if (newDate - MILLISECONDS_IN_DAY * 30 > oldDate) {
        localStorage.removeItem("LingoJoyLoginDate");
        return navigate(ERoutes.QUESTIONNAIRE_START);
      }
    }
    getProfile();
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
