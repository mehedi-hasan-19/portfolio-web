// =========================
// MOBILE MENU
// =========================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if(menuToggle){

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}



// =========================
// DARK MODE
// =========================

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        document.body.style.background = "#ffffff";

        document.body.style.color = "#000000";

        themeBtn.innerHTML = "☀️";

    }else{

        document.body.style.background = "#0f172a";

        document.body.style.color = "#ffffff";

        themeBtn.innerHTML = "🌙";

    }

});



// =========================
// TYPING EFFECT
// =========================

const typingText = document.querySelector(".typing");

const words = [
    "Frontend Developer",
    "Web Designer",
    "JavaScript Developer",
    "Freelancer"
];

let wordIndex = 0;

let charIndex = 0;

let isDeleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){

        typingText.textContent =
        currentWord.substring(0, charIndex--);

    }else{

        typingText.textContent =
        currentWord.substring(0, charIndex++);

    }

    let typingSpeed = isDeleting ? 80 : 120;

    if(!isDeleting && charIndex === currentWord.length){

        isDeleting = true;

        typingSpeed = 1500;

    }

    else if(isDeleting && charIndex === 0){

        isDeleting = false;

        wordIndex = (wordIndex + 1) % words.length;

    }

    setTimeout(typeEffect, typingSpeed);

}

typeEffect();



// =========================
// SKILLS BAR ANIMATION
// =========================

const skillsSection = document.querySelector(".skills");

const skillBars = document.querySelectorAll(".skill-bar");

window.addEventListener("scroll", () => {

    const sectionTop = skillsSection.offsetTop - 400;

    if(window.scrollY >= sectionTop){

        skillBars.forEach(bar => {

            const width =

            bar.classList.contains("html") ? "95%" :

            bar.classList.contains("css") ? "90%" :

            bar.classList.contains("js") ? "85%" :

            "80%";

            bar.style.width = width;

        });

    }

});


const eduCards = document.querySelectorAll(".edu-card");

eduCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.querySelector(".edu-icon").style.transform = "scale(1.15) rotate(10deg)";
    });

    card.addEventListener("mouseleave", () => {
        card.querySelector(".edu-icon").style.transform = "scale(1) rotate(0)";
    });

});


const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function(e){

    e.preventDefault();

    const button = this.querySelector("button");

    button.innerText = "Message Sent ✓";

    setTimeout(() => {
        button.innerText = "Send Message";
        this.reset();
    }, 2000);

});

const date = document.getElementById("date");
const time = document.getElementById("time");

function updateClock(){

    const now = new Date();

    date.innerHTML = now.toLocaleDateString("en-US",{
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    });

    time.innerHTML = now.toLocaleTimeString();
}

updateClock();

setInterval(updateClock,1000);

const dateEl = document.getElementById("current-date");
const timeEl = document.getElementById("current-time");

function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateEl.textContent = now.toLocaleDateString("en-US", options);

    timeEl.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

portfolio code.txt
Displaying portfolio code.txt.