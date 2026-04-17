import { getUserData } from "../google-login.js";

let currentIndex = 0;

const questions = [
  {
    id: "age_group",
    question: "How old are you?",
    options: ["Under 18", "18-20", "20-35", "35+"],
  },

  {
    id: "hobbies",
    question: "What are your hobbies?",
    options: ["Reading", "Art", "Coding", "Cooking", "Music", "Other"],
  },

  {
    id: "talent_goal",
    question: "What is something you wish to achieve?",
    options: [
      "Learning a new language",
      "Getting in shape",
      "Healthy Lifestyle",
      "Learning a new skill",
      "Other",
    ],
  },

  {
    id: "streak_goal",
    question: "What's your target streak?",
    options: ["3 days", "1 week", "2 weeks", "3 weeks", "A month", "30 days+"],
  },

  {
    id: "goal_reason",
    question: "Why do you want to achieve this streak?",
    options: [
      "Improving everyday life",
      "Cherish every moment",
      "Feeling proud",
      "Simply being more productive",
      "Other",
    ],
  },
];

const answers = {};

/*answers["age_group"] =*/

function showQuestion(index) {
  const q = questions[index];
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");

  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    optionsContainer.appendChild(btn);
    btn.addEventListener("click", async () => {
      answers[q.id] = option;

      currentIndex++;

      if (currentIndex < questions.length) {
        showQuestion(currentIndex);
      } else {
        const user = await getUserData();
        const name = user ? user.name : "there";

        document.body.classList.add("hide_survey");
        document.querySelector(".survey_title").innerText =
          "Those are some great goals!";
        document.querySelector(".end_h2").innerText =
          `You just took a very important step ${name}..`;
      }
    });
  });
  updateCircles(index);
}

function updateCircles(index) {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle, i) => {
    if (i <= index) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
}

showQuestion(currentIndex);
