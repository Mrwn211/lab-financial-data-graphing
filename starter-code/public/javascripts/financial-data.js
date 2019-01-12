const baseURL = "https://api.coindesk.com/v1/bpi/historical/close.json";

const startInput = document.getElementById("start");
const endInput = document.getElementById("end");

const getDataAndPrintGraph = () => {
  axios
    .get(baseURL, {
      params: {
        start: startInput.value,
        end: endInput.value
      }
    })
    .then(function(response) {
      console.log(response);
      const dates = Object.keys(response.data.bpi);
      const prices = Object.values(response.data.bpi);
      printGraph(dates, prices);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const printGraph = (labels, data) => {
  const ctx = document.getElementById("myLineChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data
        }
      ]
    }
  });
};

getDataAndPrintGraph();

startInput.onchange = function() {
  getDataAndPrintGraph();
};
endInput.onchange = function() {
  getDataAndPrintGraph();
};