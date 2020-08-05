# Hurricanes

## Installation

Make sure you have [node](https://nodejs.org/en/) installed. Download the files, open a terminal in the repo folder and run:

```
npm install
```

## Running

All the tasks are controlled through `npm` scripts, so you can open up a terminal in the project and run:

1. `npm run start` - this will start up the data visualization on a local server and open up a browser that points to the local server (http://localhost:8080/).

## The Data

The data in this repo comes from a couple sources:

- RSMC Tokyo Typhoon Center's [Best Track Data 1951 - 2019](http://www.jma.go.jp/jma/jma-eng/jma-center/rsmc-hp-pub-eg/besttrack.html).
  - [Format specification](http://www.jma.go.jp/jma/jma-eng/jma-center/rsmc-hp-pub-eg/Besttracks/e_format_bst.html).
- NOAA's [Atlantic hurricane database (HURDAT2) 1851-2019](https://www.nhc.noaa.gov/data/#hurdat)
  - [Format specification](https://www.nhc.noaa.gov/data/hurdat/hurdat2-format-nov2019.pdf).
- NOAA's [Northeast and North Central Pacific hurricane database (HURDAT2) 1949-2019](https://www.nhc.noaa.gov/data/#hurdat)
  - [Format specification](https://www.nhc.noaa.gov/data/hurdat/hurdat2-format-nov2019.pdf).
