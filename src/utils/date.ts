export const formatDateToString = (year: number, month: number, day=0): string => {
    const date = new Date(year, month, day);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`; // 예: 20250401
  };

const currDate = new Date()

export  const startDate = formatDateToString(currDate.getFullYear(), currDate.getMonth(), 1);
export  const endDate = formatDateToString(currDate.getFullYear(), currDate.getMonth() + 1, 0);