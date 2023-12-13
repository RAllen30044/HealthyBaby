import { baseUrl } from "../../../Types";

const diaperUrl = `${baseUrl}/diapersHistory`;
export type DaipersHistoryInfoTypes={
      time:string;
      date: string;
      consistancy: string;
      type: string;
      id: number;
}

export const getDaipersHistory = () =>
  fetch(diaperUrl)
    .then((res) => res.json())
    .then((data) => data);
    
    export const postDiaperHistory = (diapersHistoryInfo: Omit<DaipersHistoryInfoTypes, "id">)=>
      fetch(diaperUrl, {
            method:"POST",
            headers: { "Content-type": "application/json" },
            body:JSON.stringify(diapersHistoryInfo)
      })
    
    export const deleteDiaperHistory=(id:number)=>
      fetch(`${diaperUrl}/${id}`, {
        method:"DELETE"
      })
    
