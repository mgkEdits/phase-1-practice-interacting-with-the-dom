const init = ()=>{
    
    // Initialize variables
let isTimerRunning = true; // Track if the timer is running
let timerInterval; // Interval for updating the counter
const counterElement = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const likeButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

// Function to update the counter element every second
function startTimer() {
  timerInterval = setInterval(function () {
    const currentCount = parseInt(counterElement.innerText);
    counterElement.innerText = currentCount + 1;
  }, 1000); // 1000 milliseconds = 1 second
}

// Initial timer start
startTimer();

// Event listener for the minus button
minusButton.addEventListener("click", function () {
  const currentCount = parseInt(counterElement.innerText);
  counterElement.innerText = currentCount - 1;
});

// Event listener for the plus button
plusButton.addEventListener("click", function () {
  const currentCount = parseInt(counterElement.innerText);
  counterElement.innerText = currentCount + 1;
});

// Event listener for the like button
likeButton.addEventListener("click", function () {
  const currentCount = parseInt(counterElement.innerText);
  const likesList = document.querySelector(".likes");
  const existingLike = Array.from(likesList.children).find(
    (like) => parseInt(like.dataset.num) === currentCount
  );

  if (existingLike) {
    // Increment the like count
    const likeCount = existingLike.querySelector("span");
    const newCount = parseInt(likeCount.innerText) + 1;
    likeCount.innerText = newCount;
  } else {
    // Create a new like entry
    const likeEntry = document.createElement("li");
    likeEntry.dataset.num = currentCount;
    likeEntry.innerHTML = `${currentCount} has been liked <span>1</span> time`;
    likesList.appendChild(likeEntry);
  }
});

// Event listener for the pause button
pauseButton.addEventListener("click", function () {
  if (isTimerRunning) {
    clearInterval(timerInterval); // Pause the timer
    this.innerText = "resume";
  } else {
    startTimer(); // Resume the timer
    this.innerText = "pause";
  }

  // Toggle the state of the timer and buttons
  isTimerRunning = !isTimerRunning;
  const buttonsToToggle = document.querySelectorAll("button:not(#pause)");
  buttonsToToggle.forEach((button) => {
    button.disabled = !isTimerRunning;
  });
});

// Event listener for the comment form submission
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const commentInput = this.querySelector("input[type='text']");
  const commentText = commentInput.value.trim();

  if (commentText) {
    const commentsSection = document.querySelector(".comments");
    const commentParagraph = document.createElement("p");
    commentParagraph.innerText = commentText;
    commentsSection.appendChild(commentParagraph);
    commentInput.value = "";
  }
});


}

document.addEventListener('DOMContentLoaded', init)