import { ELocalization, ELocalizationQuestionnaire, EUrls } from "@/constants"
import axios from "@/utils/AxiosConfig"

export type TExerciseStatus = 'in_progress' | 'completed' | 'skipped';

type TLocalizationResponse = {
    data: {
        resources: {
            localization: ELocalization;
            localizationQuest: ELocalizationQuestionnaire;
        }
    }
}

export const updatePostProgress = async (lessonId: string, exerciseId: string, status: TExerciseStatus) => {
    try {
        await axios.post(EUrls.USERS_PROGRESS, { lessonId, exerciseId, status })
    } catch (error) {
        console.error(error)
    }
}

export const getServerLocalization = async () => {
    const { data }: TLocalizationResponse = await axios.get(`${EUrls.CONTAINERS}/web`, {
        headers: {
            "Container-Token": import.meta.env.VITE_WEB_KEY || 'No env',
        },
    });

    return data.resources;
};