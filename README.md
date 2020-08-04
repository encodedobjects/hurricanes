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

The data in this repo is from NOAA's [HURDAT2 datasets](https://www.nhc.noaa.gov/data/#hurdat), specifically:

- Atlantic hurricane database (HURDAT2) 1851-2019
- Northeast and North Central Pacific hurricane database (HURDAT2) 1949-2019

The HurDat2 format is described [here](https://www.nhc.noaa.gov/data/hurdat/hurdat2-format-nov2019.pdf). It is composed of header lines that look like:

```
AL092011, IRENE, 39,
1234567890123456789012345768901234567 
AL (Spaces 1 and 2) – Basin – Atlantic
09 (Spaces 3 and 4) – ATCF cyclone number for that year
2011 (Spaces 5-8, before first comma) – Year
IRENE (Spaces 19-28, before second comma) – Name, if available, or else “UNNAMED” 39
(Spaces 34-36) – Number of best track entries – rows – to follow 
```

and data lines that look like:

```
The remaining rows of data in the new format are the data lines. These have the following format:
20110828, 0935, L, TS, 39.4N, 74.4W, 60, 959, 230, 280, 160, 110, 150, 150, 80, 30, 0, 0, 0, 0, 
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
2011 (Spaces 1-4) – Year
08 (Spaces 5-6) – Month
28 (Spaces 7-8, before 1st comma) – Day
09 (Spaces 11-12) – Hours in UTC (Universal Time Coordinate)
35 (Spaces 13-14, before 2nd comma) – Minutes
L (Space 17, before 3rd comma) – Record identifier (see notes below)
C – Closest approach to a coast, not followed by a landfall G
– Genesis
I – An intensity peak in terms of both pressure and wind
L – Landfall (center of system crossing a coastline)
P – Minimum in central pressure
R – Provides additional detail on the intensity of the cyclone when rapid changes are underway
S – Change of status of the system
T – Provides additional detail on the track (position) of the cyclone W – Maximum sustained wind speed
TS (Spaces 20-21, before 4th comma) – Status of system. Options are: TD
– Tropical cyclone of tropical depression intensity (< 34 knots)
TS – Tropical cyclone of tropical storm intensity (34-63 knots)
HU – Tropical cyclone of hurricane intensity (> 64 knots)
EX – Extratropical cyclone (of any intensity)
SD – Subtropical cyclone of subtropical depression intensity (< 34 knots)
SS – Subtropical cyclone of subtropical storm intensity (> 34 knots)
LO – A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone (of any intensity)
WV – Tropical Wave (of any intensity)
DB – Disturbance (of any intensity)
39.4 (Spaces 24-27) – Latitude
N (Space 28, before 5th comma) – Hemisphere – North or South
74.4 (Spaces 31-35) – Longitude
W (Space 36, before 6th comma) – Hemisphere – West or East
60 (Spaces 39-41, before 7th
comma) – Maximum sustained wind (in knots)
959 (Spaces 44-47, before 8th comma) – Minimum Pressure (in millibars)
230 (Spaces 50-53, before 9th comma) – 34 kt wind radii maximum extent in northeastern quadrant (in nautical miles)
280 (Spaces 56-59, before 10th comma) – 34 kt wind radii maximum extent in southeastern quadrant (in nautical miles)
160 (Spaces 62-65, before 11th comma) – 34 kt wind radii maximum extent in southwestern quadrant (in nautical miles)
110 (Spaces 68-71, before 12th comma) – 34 kt wind radii maximum extent in northwestern quadrant (in nautical miles)
150 (Spaces 74-77, before 13th comma) – 50 kt wind radii maximum extent in northeastern quadrant (in nautical miles)
150 (Spaces 80-83, before 14th comma) – 50 kt wind radii maximum extent in southeastern quadrant (in nautical miles)
80 (Spaces 86-89, before 15th comma) – 50 kt wind radii maximum extent in southwestern quadrant (in nautical miles)
30 (Spaces 92-95, before 16th comma) – 50 kt wind radii maximum extent in northwestern quadrant (in nautical miles)
0 (Spaces 98-101, before 17th comma) – 64 kt wind radii maximum extent in northeastern quadrant (in nautical miles) 
0 (Spaces 104-107, before 18th comma) – 64 kt wind radii maximum extent in southeastern quadrant (in nautical miles)
0 (Spaces 110-113, before 19th comma) – 64 kt wind radii maximum extent in southwestern quadrant (in nautical miles) 0
(Spaces 116-119, before 20th comma) – 64 kt wind radii maximum extent in northwestern quadrant (in nautical miles) 
```
