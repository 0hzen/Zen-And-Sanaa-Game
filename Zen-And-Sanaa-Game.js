// Game variables
const zen = document.getElementById("zen");
const sanaa = document.getElementById("sanaa");
const joystickKnob = document.getElementById("joystick-knob");
const jumpBtn = document.getElementById("jump-btn");
let zenPositionX = 10;
let sanaaPositionX = 25;
let verticalPosition = 50;
let isJumping = false;
let zenName = "Zen";
let sanaaName = "Sanaa";

// Simple dialogue that changes as you move
let dialogue = [
    "Zen: I love you, Sanaa.",
    "Sanaa: I love you too, Zen.",
    "Zen: This journey is magical with you.",
    "Sanaa: I wouldn't want to be anywhere else, Zen."
];

let dialogueIndex = 0;

// Joystick movement parameters
let joystickOffsetX = 0;
let joystickOffsetY = 0;
let joystickRadius = 50;
let joystickCenter = { x: 50, y: 50 };

// Function to move Zen and Sanaa with the joystick
joystickKnob.addEventListener('touchstart', (e) => {
    let touch = e.touches[0];
    joystickOffsetX = touch.clientX - joystickKnob.offsetLeft;
    joystickOffsetY = touch.clientY - joystickKnob.offsetTop;
    e.preventDefault();
});

joystickKnob.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    let newX = touch.clientX - joystickOffsetX;
    let newY = touch.clientY - joystickOffsetY;

    // Limit the knob movement within the base circle
    let dist = Math.sqrt(Math.pow(newX - joystickCenter.x, 2) + Math.pow(newY - joystickCenter.y, 2));
    if (dist > joystickRadius) {
        let angle = Math.atan2(newY - joystickCenter.y, newX - joystickCenter.x);
        newX = joystickCenter.x + joystickRadius * Math.cos(angle);
        newY = joystickCenter.y + joystickRadius * Math.sin(angle);
    }

    joystickKnob.style.left = newX + 'px';
    joystickKnob.style.top = newY + 'px';

    // Update Zen and Sanaa position
    zenPositionX = (newX / joystickBase.offsetWidth) * 100; // Adjust Zen's horizontal position
    sanaaPositionX = zenPositionX + 10; // Keep Sanaa slightly ahead of Zen
    verticalPosition = (newY / joystickBase.offsetHeight) * 100; // Adjust vertical movement

    // Update character positions
    zen.style.left = zenPositionX + '%';
    sanaa.style.left = sanaaPositionX + '%';
    zen.style.top = verticalPosition + '%';
    sanaa.style.top = verticalPosition + '%';

    // Update dialogue when Zen reaches certain positions
    if (zenPositionX > 50 && dialogueIndex < dialogue.length) {
        alert(dialogue[dialogueIndex]);
        dialogueIndex++;
    }

    e.preventDefault();
});

joystickKnob.addEventListener('touchend', () => {
    joystickKnob.style.left = '50px';
    joystickKnob.style.top = '50px'; // Reset the knob position to center when released
});

// Function for the jump button
jumpBtn.addEventListener('click', () => {
    if (!isJumping) {
        isJumping = true;
        zen.style.transition = "top 0.3s ease-out";
        sanaa.style.transition = "top 0.3s ease-out";
        zen.style.top = (verticalPosition - 20) + '%'; // Move Zen up
        sanaa.style.top = (verticalPosition - 20) + '%'; // Move Sanaa up
        setTimeout(() => {
            zen.style.top = verticalPosition + '%'; // Return Zen to original position
            sanaa.style.top = verticalPosition + '%'; // Return Sanaa to original position
            isJumping = false;
        }, 300);
    }
});
