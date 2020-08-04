import hurdat2Atlantic from "./hurdat2-1851-2019-052520.csv";
import hurdat2Pacific from "./hurdat2-nepac-1949-2019-042320.csv";

/**
 * Take a CSV string for the HURDAT2 format and parse it into an array of hurricane objects.
 * @param {string} csvString
 */
function parseCsvData(csvString) {
  const hurricanes = [];
  const lines = csvString.trim().split("\n");
  let i = 0;

  do {
    const headerLine = lines[i];
    const parts = headerLine.split(",").map((part) => part.trim());
    const id = parts[0];
    const name = parts[1];
    const numDataPoints = parseInt(parts[2], 10);

    const hurricaneData = {
      id,
      name,
      numDataPoints,
      data: [],
    };

    for (let j = i + 1; j < i + numDataPoints + 1; j++) {
      const hurricaneLine = lines[j];
      const parts = hurricaneLine.split(",").map((part) => part.trim());
      const [
        dateString,
        timeString,
        recordId,
        systemStatus,
        latString,
        longString,
        maxWindString,
        minPressureString,
        ...rest
      ] = parts;

      const year = parseInt(dateString.slice(0, 4), 10);
      const month = parseInt(dateString.slice(4, 6), 10);
      const day = parseInt(dateString.slice(6, 8), 10);
      const hour = parseInt(timeString.slice(0, 2), 10);
      const minute = parseInt(timeString.slice(2, 4), 10);
      const latDir = latString[latString.length - 1];
      const lat = (latDir === "S" ? -1 : 1) * parseFloat(latString.slice(0, latString.length));
      const longDir = longString[longString.length - 1];
      const long = (longDir === "W" ? -1 : 1) * parseFloat(longString.slice(0, longString.length));
      const maxWind = parseFloat(maxWindString);
      const minPressure = parseFloat(minPressureString);

      hurricaneData.data.push({
        systemStatus,
        maxWind,
        minPressure,
        recordId,
        year,
        month,
        day,
        hour,
        minute,
        lat,
        long,
      });
    }

    hurricanes.push(hurricaneData);
    i += numDataPoints + 1;
  } while (i < lines.length);

  return hurricanes;
}

const atlanticHurricanes = parseCsvData(hurdat2Atlantic);
const pacificHurricanes = parseCsvData(hurdat2Pacific);
const allHurricaneData = [...atlanticHurricanes, ...pacificHurricanes];

export { atlanticHurricanes, pacificHurricanes, allHurricaneData };
