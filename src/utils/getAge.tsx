export const getAge = (month: number | undefined, day: number | undefined, year: number | undefined) => {
    if (!month || !day || !year) return null;
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    // If the selected birth year is in the future, return 0
    if (birthDate > today) {
        return 0;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Check if the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
