import axios from "axios";

export const getAllData = async (latitude:number, longitude:number,) => {
  return await axios.get(`https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`);
};
