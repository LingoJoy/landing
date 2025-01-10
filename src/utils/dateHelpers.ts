export const formatDate = (date: string) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1
    return `${newDate.getDate()}.${month < 10 ? `0${month}` : month}.${newDate.getFullYear()}`;
};
