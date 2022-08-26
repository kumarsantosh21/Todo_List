import moment from "moment";

export default function localDateFunction(recentupdateddate) {
  let tolocaldate;
  tolocaldate = moment
    .utc(recentupdateddate)
    .local()
    .format("MMMM Do YYYY, h:mm a");
  // moment.utc(recentupdateddate).local().format("MMMM Do YYYY, h:mm:ss a");
  const presentUTCDate = new Date().toISOString();
  const savedYear = parseInt(
    moment.utc(recentupdateddate).local().format("YYYY")
  );
  const presentYear = parseInt(
    moment.utc(presentUTCDate).local().format("YYYY")
  );
  const savedMonth = parseInt(
    moment.utc(recentupdateddate).local().format("MM")
  );
  const presentMonth = parseInt(
    moment.utc(presentUTCDate).local().format("MM")
  );

  const savedDate = parseInt(
    moment.utc(recentupdateddate).local().format("Do")
  );
  const presentDate = parseInt(moment.utc(presentUTCDate).local().format("Do"));

  const savedHour = parseInt(moment.utc(recentupdateddate).local().format("H"));
  const presentHour = parseInt(moment.utc(presentUTCDate).local().format("H"));
  const savedMinute = parseInt(
    moment.utc(recentupdateddate).local().format("mm")
  );
  const presentMinute = parseInt(
    moment.utc(presentUTCDate).local().format("mm")
  );
  const savedSecond = parseInt(
    moment.utc(recentupdateddate).local().format("ss")
  );
  const presentSecond = parseInt(
    moment.utc(presentUTCDate).local().format("ss")
  );

  // console.log(
  //   savedYear,
  //   presentYear,
  //   savedMonth,
  //   presentMonth,
  //   savedDate,
  //   presentDate,
  //   savedHour,
  //   presentHour,
  //   savedMinute,
  //   presentMinute,
  //   savedSecond,
  //   presentSecond
  // );

  if (savedYear !== presentYear) {
    tolocaldate = presentYear - savedYear;
    if (tolocaldate > 1) {
      tolocaldate = tolocaldate + " Years ago";
    } else {
      tolocaldate = tolocaldate + " Year ago";
    }
  } else if (savedMonth !== presentMonth) {
    tolocaldate = presentMonth - savedMonth;
    if (tolocaldate > 1) {
      tolocaldate = tolocaldate + " Months ago";
    } else {
      tolocaldate = tolocaldate + " Month ago";
    }
  } else if (savedDate !== presentDate) {
    tolocaldate = presentDate - savedDate;
    if (tolocaldate > 1) {
      tolocaldate = tolocaldate + " days ago";
    } else {
      tolocaldate = tolocaldate + " day ago";
    }
  } else if (savedHour !== presentHour) {
    tolocaldate = presentHour - savedHour;
    if (tolocaldate > 1) {
      tolocaldate = tolocaldate + " hours ago";
    } else {
      tolocaldate = tolocaldate + " hour ago";
    }
  } else if (savedMinute !== presentMinute) {
    tolocaldate = presentMinute - savedMinute;
    if (tolocaldate > 1) {
      tolocaldate = tolocaldate + " minutes ago";
    } else {
      tolocaldate = tolocaldate + " minute ago";
    }
  } else {
    tolocaldate = "just now";
  }
  return tolocaldate;
}
