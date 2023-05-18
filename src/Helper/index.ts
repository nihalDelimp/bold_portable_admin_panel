 import moment from "moment";

 export function getFormatedDate(date : string) {
     if(!date){
      return 'NA'
     }
      let formatedDateTime = moment(date).format('Do MMM YYYY, hh:mm:ss A');
      return formatedDateTime;
}

export function getDateWithoutTime(date : string) {
  if(!date){
   return 'NA'
  }
   let formatedDateTime = moment(date).format('Do MMM YYYY');
   return formatedDateTime;
}

export function getStringDate (date : number)  {
   const readAbleDate = new Date(date)
   let formatedDateTime = moment(readAbleDate).format('MMM Do YYYY, hh:mm:ss A');
   return formatedDateTime;
}

export function getFirstChartByFullName (fullName : any){ 
  var str = fullName
  str = str.split(" "); 
  str = str.filter((res : any  ) => res.length > 0 ); 
  str = str.map(function(res : any){ 
    return res[0].toUpperCase(); 
  }); 
  str = str.join(""); 
  return str; 
};