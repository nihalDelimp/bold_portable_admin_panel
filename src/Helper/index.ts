 import moment from "moment";

 export function getFormatedDate(date : string) {
     if(!date){
      return 'NA'
     }
      let formatedDateTime = moment(date).format('DD MMM YYYY, hh:mm A');
      return formatedDateTime;
}

export function getDateWithoutTime(date : string) {
  if(!date){
   return 'NA'
  }
   let formatedDateTime = moment(date).format('MMM DD YYYY');
   return formatedDateTime;
}

export function getStringDate (date : number)  {
   const readAbleDate = new Date(date)
   let formatedDateTime = moment(readAbleDate).format('MMM DD YYYY, hh:mm A');
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

export const CapitalizeFirstLetter = (data : string) => {
  const str = data.charAt(0).toUpperCase() + data.slice(1);
   return str
  }

  export function replaceHyphenCapitolize (strData : string){
    if(strData){
      const newStr = strData.charAt(0).toUpperCase() + strData.slice(1);
      let replacedWord = newStr.replace(/-/g, ' ');
      return replacedWord
    }
  }

  export function trimObjValues(obj: any) {
    return Object.keys(obj).reduce((acc:any, curr:any) => {
        acc[curr] = obj[curr]
        if (typeof obj[curr] === 'string') {
            acc[curr] = obj[curr].trim()
        }
        return acc;
    }, {});
}

