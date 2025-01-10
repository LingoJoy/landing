import { DEFAULT_LEVEL_POINT_DATA } from "@/constants";

export const getLevel = (
    words: number
) => {
    return DEFAULT_LEVEL_POINT_DATA.find(
        (el) => words >= el.active && words <= el.passive,
    ) || DEFAULT_LEVEL_POINT_DATA[0];
}