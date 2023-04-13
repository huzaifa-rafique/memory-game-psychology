let attempts = 0;
let timerInterval;

function startTimer() {
  let seconds = 0;
  let minutes = 0;
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function incrementAttempts() {
  attempts++;
  document.getElementById('attempts').textContent = attempts;
}

// Example usage:
startTimer();
incrementAttempts();

let objectArray = ["apple", "banana", "orange", "pear", "grape", "pineapple", "watermelon", "kiwi", "mango", "peach", "plum", "strawberry", "blueberry", "raspberry"];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function startGame() {
  let shuffledArray = shuffleArray(objectArray);
  let table = document.createElement("table");
  let row, cell, text;
  let index = 0;
  for (let i = 0; i < 3; i++) {
    row = table.insertRow();
    for (let j = 0; j < 5; j++) {
      cell = row.insertCell();
      text = document.createTextNode(shuffledArray[index++]);
      cell.appendChild(text);
    }
  }
  document.getElementById("gameBoard").appendChild(table);
  setTimeout(function() {
    table.style.display = "none";
    document.getElementById("userInputForm").style.display = "block";
  }, 15000);
}


let rememberedArray;

function checkInput() {
  event.preventDefault();
  let userInput = document.getElementById("userInput").value.trim().toLowerCase();
  if (userInput === "") {
    alert("Please enter at least one item.");
    return;
  }
  rememberedArray = userInput.split(/\s*,\s*|\s+/);
  document.getElementById("userInputForm").style.display = "none";
  document.getElementById("result").innerHTML = "<h2>Results</h2>";
  let correctCount = 0;
  let incorrectCount = 0;
  for (let i = 0; i < objectArray.length; i++) {
    if (rememberedArray.includes(objectArray[i])) {
      document.getElementById("result").innerHTML += "<span style='color:green; font-weight:bold;'>" + objectArray[i] + "</span>, ";
      correctCount++;
    } else {
      document.getElementById("result").innerHTML += "<span style='color:red;'>" + objectArray[i] + "</span>, ";
      incorrectCount++;
    }
  }
  document.getElementById("result").innerHTML = document.getElementById("result").innerHTML.slice(0, -2);
  document.getElementById("result").innerHTML += "<br><br>You remembered " + correctCount + " out of " + objectArray.length + " items correctly.";
  document.getElementById("result").style.display = "block";
  document.getElementById("feedbackForm").style.display = "block";
  stopTimer();
}


function submitFeedback() {
	event.preventDefault();
	let feedbackData = new FormData(document.getElementById("feedbackForm"));
	let feedbackObject = {};
	for (let [key, value] of feedbackData.entries()) {
		if (key === "strategy") {
			if (!feedbackObject.hasOwnProperty(key)) {
				feedbackObject[key] = [value];
			} else {
				feedbackObject[key].push(value);
			}
		} else {
			feedbackObject[key] = value;
		}
	}
	console.log(feedbackObject);
	alert("Thank you for your feedback!");
	document.getElementById("feedbackForm").reset();
}
document.getElementById("feedbackForm").addEventListener("submit", submitFeedback);
