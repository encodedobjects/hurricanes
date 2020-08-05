import hurdat2Atlantic from "./hurdat2-1851-2019-052520.csv";
import hurdat2Pacific from "./hurdat2-nepac-1949-2019-042320.csv";
import bstAll from "./bst_all.csv";

const stringToInt = (s) => parseInt(s.trim(), 10);
const stringToFloat = (s) => parseFloat(s.trim());
const sliceAndTrim = (s, start, end) => s.slice(start, end).trim();

function parseRsmcCsvData(csvString) {
  const hurricanes = [];
  const lines = csvString.trim().split("\n");
  let i = 0;

  do {
    const headerLine = lines[i];

    const indicator = sliceAndTrim(headerLine, 0, 5);
    const internationalId = sliceAndTrim(headerLine, 6, 10);
    const numDataPoints = stringToInt(headerLine.slice(12, 15));
    const tropicalCycloneId = sliceAndTrim(headerLine, 16, 20);
    const flag = sliceAndTrim(headerLine, 26, 27);
    const name = sliceAndTrim(headerLine, 30, 50);

    const hurricaneData = {
      id: internationalId,
      tropicalCycloneId,
      indicator,
      name,
      flag,
      numDataPoints,
      data: [],
    };

    for (let j = i + 1; j < i + numDataPoints + 1; j++) {
      const hurricaneLine = lines[j];

      const year = stringToInt(hurricaneLine.slice(0, 2));
      const month = stringToInt(hurricaneLine.slice(2, 4));
      const day = stringToInt(hurricaneLine.slice(4, 6));
      const hour = stringToInt(hurricaneLine.slice(6, 8));
      const indicator = sliceAndTrim(hurricaneLine, 9, 12);
      const grade = stringToInt(hurricaneLine.slice(13, 14));
      const lat = stringToFloat(hurricaneLine.slice(15, 18)) * 0.1;
      const long = stringToFloat(hurricaneLine.slice(19, 23)) * 0.1;

      // Not actually min pressure! It's central pressure
      const minPressure = stringToFloat(hurricaneLine.slice(24, 28));
      const maxWind = stringToFloat(hurricaneLine.slice(33, 36));

      // Other info skipped...

      hurricaneData.data.push({
        maxWind,
        minPressure,
        year,
        month,
        day,
        hour,
        lat,
        long,
        indicator,
        grade,
      });
    }

    hurricanes.push(hurricaneData);
    i += numDataPoints + 1;
  } while (i < lines.length);

  return hurricanes;
}

/**
 * Take a CSV string for the HURDAT2 format and parse it into an array of hurricane objects.
 * @param {string} csvString
 */
function parseHurdat2CsvData(csvString) {
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

const japaneseHurricanes = parseRsmcCsvData(bstAll);
const atlanticHurricanes = parseHurdat2CsvData(hurdat2Atlantic);
const pacificHurricanes = parseHurdat2CsvData(hurdat2Pacific);
const allHurricaneData = [...atlanticHurricanes, ...pacificHurricanes, ...japaneseHurricanes];

export { japaneseHurricanes, atlanticHurricanes, pacificHurricanes, allHurricaneData };
