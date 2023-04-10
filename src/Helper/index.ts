 import moment from "moment";

 export const acceptedFileTypes = "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
 export const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
 export const imageMaxSize = 10000000; // bytes
 export const limitDesc = 100;

 
 export function getFormatedDate(date : any) {
     if(!date){
      return 'NA'
     }
      let formatedDateTime = moment(date).format('MMMM Do YYYY, hh:mm:ss A');
      return formatedDateTime;
  
}