const cart = window.cart || {};

const setLastInputValue = (inputId) => {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "checkbox") {
    const lastValue = localStorage.getItem(inputId);
    if (lastValue) {
      input.checked = lastValue === "on";
    }
    return;
  }

  if (input.type === "radio") {
    const radioName = input.name;
    const lastValue = localStorage.getItem(radioName);
    if (lastValue) {
      const radios = document.getElementsByName(radioName);
      radios.forEach((radio) => {
        if (radio.value === lastValue) {
          radio.checked = true;
        } else {
          radio.checked = false;
        }
      });
    }
  }

  const lastValue = localStorage.getItem(inputId);
  if (lastValue) {
    input.value = lastValue;
  }
};
const saveInput = (inputId) => {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("change", () => {
    const value = input.value;
    if (input.type === "radio") {
      const radios = document.getElementsByName(input.name);
      let checkedValue = "";

      radios.forEach((radio) => {
        if (radio.checked) checkedValue = radio.value;
      });
      if (checkedValue) {
        localStorage.setItem(input.name, checkedValue);
      } else {
        localStorage.removeItem(input.name);
      }
      return;
    }
    if (value) {
      localStorage.setItem(inputId, value);
    } else {
      localStorage.removeItem(inputId);
    }
  });
};
const wireUpAllAmountSelectors = () => {
  const allSelectors = document.querySelectorAll(".amount-selector");
  allSelectors.forEach((selector) => {
    const decrementBtn = selector.querySelector(".decrement");
    const incrementBtn = selector.querySelector(".increment");
    const input = selector.querySelector('input[type="number"]');

    decrementBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 0;
      if (input.min !== undefined && value <= parseInt(input.min, 10)) return;
      input.value = value - 1;
      input.dispatchEvent(new Event("change"));
    });

    incrementBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10) || 0;
      if (input.max !== undefined && value >= parseInt(input.max, 10)) return;
      input.value = value + 1;
      input.dispatchEvent(new Event("change"));
    });
  });
};

const addGetPriceEventListener = () => {
  const getPriceBtn = document.querySelector(".get-price");
  if (!getPriceBtn) return;

  const inputs = [
    "villa",
    "hotel",
    "start-date",
    "end-date",
    "adults",
    "children",
    "rooms",
  ];
  inputs.forEach((inputId) => saveInput(inputId));
  inputs.forEach((i) => setLastInputValue(i));

  const activitiesCheckboxes = document.querySelectorAll(".activity-checkbox");

  activitiesCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const activityId = checkbox.id;
      if (checkbox.checked) {
        localStorage.setItem(activityId, checkbox.value);
      } else {
        localStorage.removeItem(activityId);
      }
    });
    setLastInputValue(checkbox.name);
  });

  const activitiesAmounts = document.querySelectorAll(".activity-input");
  activitiesAmounts.forEach((input) => {
     if (!input) return;
    const activityId = input.id;
    input.addEventListener("change", () => {
      const value = input.value;
      if (value) {
        localStorage.setItem(activityId, value);
      } else {
        localStorage.removeItem(activityId);
      }
    });
    setLastInputValue(activityId);
  });
};
document.addEventListener("DOMContentLoaded", function () {
  wireUpAllAmountSelectors();
  addGetPriceEventListener();
});
