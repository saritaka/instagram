export function StoryDate({ StoryDate }) {
  //   console.log("date,", StoryDate);
  const calculatedDate = diffWeeks(StoryDate);

  function diffWeeks(date1) {
    const date2 = new Date();

    // console.log("gettime,", date2.getTime());

    var diff = (date2.getTime() - date1) / 1000;
    diff /= 60 * 60 * 24 * 7;
    // console.log("diff-w", diff);
    if (diff < 1) {
      var diff = (date2.getTime() - date1) / 1000;
      diff /= 60 * 60 * 24;
      // console.log("diff-d", diff);

      if (diff < 1) {
        var diff = (date2.getTime() - date1) / 1000;
        diff /= 60 * 60;
        // console.log("diff-h", diff);
        if (diff < 1) {
          var diff = (date2.getTime() - date1) / 1000;
          diff /= 60;
          // console.log("diff-m", diff);
          return Math.abs(Math.round(diff)) + "minutes";
        }
        return Math.abs(Math.round(diff)) + "h";
      }
      return Math.abs(Math.round(diff)) + "d";
    }
    // console.log(Math.abs(Math.round(diff)));

    return Math.abs(Math.round(diff)) + "w";
  }

  return calculatedDate;
}
