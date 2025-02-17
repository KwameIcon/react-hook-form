export const getAge = (month: number | null, day: number | null, year: number | null) => {
    if(!month || !day || !year) return;

    const birthday = new Date(year, month - 1, day);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthday.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    return ageInYears;
};
