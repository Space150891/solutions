export const formatDate = (dateString: string) => {
   if (!dateString) return '';
   const date = new Date(dateString);

   let month: string | number = date.getMonth() + 1;
   month = month < 10 ? '0' + month : month;

   let day: string | number = date.getDate();
   day = day < 10 ? '0' + day : day;

   const hours = date.getHours();

   let minutes: string | number = date.getMinutes();
   minutes = minutes < 10 ? '0' + minutes : minutes;

   const strTime = hours + ':' + minutes;

   return day + '.' + month + '.' + date.getFullYear() + '  ' + strTime;
};
