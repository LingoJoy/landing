export const handleGetBooleanAgreement = (
    agreement: string,
    state: boolean | null,
) => {
    if (agreement === "Yes" && state) return true;
    if (agreement === "No" && state !== null && !state) return true;
    return false;
};