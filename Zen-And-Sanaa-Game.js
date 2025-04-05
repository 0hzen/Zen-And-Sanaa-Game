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

// Function to move Zen and Sanaa with the joystick
let joystickOffsetX = 0;
let joystickOffsetY = 0;

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
    let dist = Math.sqrt(Math.pow(newX - 50, 2) + Math.pow(newY - 50, 2));
    if (dist > 50) {
        let angle = Math.atan2(newY - 50, newX - 50);
        newX = 50 + 50 * Math.cos(angle);
        newY = 50 + 50 * Math.sin(angle);
    }

    joystickKnob.style.left = newX + 'px';
    joystickKnob.style.top = newY + 'px';

    // Update Zen and Sanaa position
    zenPositionX = (newX / 100) * 100; // Move Zen according to the joystick's X-axis
    sanaaPositionX = (newX / 100) * 100; // Move Sanaa in sync
    verticalPosition = (newY / 100) * 100; // Move both characters vertically

    // Update character positions
    zen.style.left = zenPositionX + '%';
    sanaa.style.left = sanaaPositionX + '%';
    zen.style.top = verticalPosition + '%';
    sanaa.style.top = verticalPosition + '%';

    // Change dialogue as they move
    if (zenPositionX > 50 && dialogueIndex < dialogue.length) {
        alert(dialogue[dialogueIndex]);
        dialogueIndex++;
    }

    e.preventDefault();
});

joystickKnob.addEventListener('touchend', () => {
    joystickKnob.style.left = '25px';
    joystickKnob.style.top = '25px'; // Reset the knob position to center when released
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
