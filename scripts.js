
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",
    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [9, 7, 8, 6],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [6, 7, 8, 7],
          },
        ],
      },
      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [10, 8, 3, 12],
          },
          {
            date: '2022-11-25T20:00:00.000Z',
            time: [6, 8, 9, 11],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [10, 11, 4, 8],
          },
          {
            date: '2022-12-09T20:00:00.000Z',
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Function to create HTML content for athlete
const createHtml = (athlete) => {
  const { firstName, surname, id, races } = athlete; // destructure athlete object
  const reversedRaces = races.reverse(); // creates a copy and reverses it to work with latest race data
  const latestRace = reversedRaces[0]; // Get the latest race data
  const [year, month, day] = latestRace.date.split('T')[0].split('-'); // splits it into an array then creates an array inside separated by year, month and date
  const date = new Date(year, month -1, day);
  //  creates a Date object using the extracted year, month, and day values
  const [first, second, third, fourth] = latestRace.time; // destructure lap times from latest race object
  const total = first + second + third + fourth; // calculates total time 
  const hours = Math.floor(total / 60); // if less than 60 answer will be 0 as its less than an hour
  const minutes = total % 60; // % gives the remainder of a division
  const dayOfMonth = date.getDate();
  const monthName = MONTHS[date.getMonth()];
  const yearNumber = date.getFullYear();

  const fragment = document.createDocumentFragment(); // creates empty document fragment

  const title = document.createElement('h2'); // creates <h2> element to display athlete ID
  title.textContent = `Athlete: ${id}`;
  fragment.appendChild(title); // attaches it to the empty fragment made earlier

  const list = document.createElement('dl'); // creates list to contain athlete information

  list.innerHTML = /* html */ `
    <dt>Full Name</dt>
    <dd>${firstName} ${surname}</dd>
  
    <dt>Total Races</dt>
    <dd>${races.length}</dd>
  
    <dt>Event Date (Latest)</dt>
    <dd>${dayOfMonth} ${monthName} ${yearNumber}</dd>
  
    <dt>Total Time (Latest)</dt>
    <dd>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</dd>
  `;

  fragment.appendChild(list); // attaches it to the fragment

  return fragment; // this holds the entire athlete section
};
const NM372Section = document.querySelector('[data-athlete="NM372"]'); // selecting HTML element where information will be displayed
NM372Section.appendChild(createHtml(data.response.data.NM372)); // create html structure with details then attaches it to selected section

const SV782Section = document.querySelector('[data-athlete="SV782"]');
SV782Section.appendChild(createHtml(data.response.data.SV782));