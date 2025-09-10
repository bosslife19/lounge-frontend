
export const formattedDate = (date)=>{
    if(date){
const cleanDate = date.split("-").slice(0, 3).join("-");

const formattedDate = new Date(cleanDate).toLocaleDateString("en-US", {
  weekday: "long",   // Friday
  day: "numeric",    // 11
  month: "long",     // September
  year: "numeric",   // 2025
});

return formattedDate;
    }


}


