import { month_tr } from "./constants.js";
//bugünün tarihi
export const getDate = () => {
    const date = new Date();

    const day = date.getDate();
    const monthIndex = date.getMonth();
    return day + " " + month_tr[monthIndex];
}
console.log(getDate())


