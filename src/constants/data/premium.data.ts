import VerifyImage from "../../images/icons/verify-yellow.svg";

import RaghunathImage from "../../images/users/Raghunath.png";
import JeniferImage from "../../images/users/Jenifer.png";
import MehmetImage from "../../images/users/Mehmet.png";

import InImage from "../../images/flags/in.png";
import UsImage from "../../images/flags/us.png";
import TrImage from "../../images/flags/tr.png";

import { ISelectorData, IUser } from ".";

export const DEFAULT_ORDER_DATA: ISelectorData[] = [
    {
        id: 0,
        icon: VerifyImage,
        title: "You will receive a welcome email so you can start improving your English from day one"
    },
    {
        id: 1,
        icon: VerifyImage,
        title: "You will receive a Personalized Language  Learning Plan"
    },
    {
        id: 2,
        icon: VerifyImage,
        title: "Interactive exercises of different types"
    },
    {
        id: 3,
        icon: VerifyImage,
        title: "Continuous progress analysis"
    },
    {
        id: 4,
        icon: VerifyImage,
        title: "Individual suggestions for better learning"
    },
];

export const DEFAULT_USERS_PREMIUM_DATA: IUser[] = [
    {
        id: 0,
        image: RaghunathImage,
        name: "Raghunath Venkatesh",
        country: InImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 1,
        image: JeniferImage,
        name: "Jennifer King",
        country: UsImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 3,
        image: MehmetImage,
        name: "Mehmet Yılmaz",
        country: TrImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
];
