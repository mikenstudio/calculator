const display = document.querySelector(".display");
const buttonGroup = document.querySelectorAll(".button");
const numButtons = buttonGroup.length;

console.log(buttonGroup);
console.log(buttonGroup.length);
console.log(buttonGroup[1].textContent);

//textContent

for (let i = 0; i < numButtons; i++) {
  const currentButton = buttonGroup[i];
  const buttonValue = currentButton.textContent;
  currentButton.addEventListener("click", (e) => {
    display.textContent = `${buttonValue}`;
  });
}
