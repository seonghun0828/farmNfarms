
const buildWeek = (value) => {
  // const startDay = moment().clone().subtract(3, "day");
  // const endDay = moment().clone().add(3, "day");
  const startDay = value.clone().subtract(3, "day");
  const endDay = value.clone().add(3, "day");

  const day = startDay.clone().subtract(1, "day");
  const week = [];

  while (day.isBefore(endDay, "day")) {
    week.push(day.add(1, "day").clone())
  }

  return week;
}

export default buildWeek;