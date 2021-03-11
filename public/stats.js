function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let [ workouts, duration ] = getPieData(data);
  let [ resistance, pound ] = getDonutData(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Duration Distribution by Exercise',
          backgroundColor: colors,
          data: duration,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Duration Distribution by Exercise',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: resistance,
      datasets: [
        {
          label: 'Pounds Distribution by Exercise',
          backgroundColor: colors,
          data: pound,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Distribution by Exercise',
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function getPieData(data) {
  let workouts = [];
  let duration = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      let target = exercise.name;
      if (target) {
        if (workouts.includes(target)) {
          let index = workouts.indexOf(target);
          duration[index] += exercise.duration;
        } else {
          workouts.push(target);
          duration.push(exercise.duration);
        };
      };
    });
  });

  return [workouts, duration];
}

function getDonutData(data) {
  console.log(data);
  let resistance = [];
  let pound = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.type === 'resistance') {
        let target = exercise.name;
        if (target) {
          if (resistance.includes(target)) {
            let index = resistance.indexOf(target);
            pound[index] += exercise.weight;
          } else {
            resistance.push(target);
            pound.push(exercise.weight);
          };
        };
      };
    })
  });  

  return [resistance, pound];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
