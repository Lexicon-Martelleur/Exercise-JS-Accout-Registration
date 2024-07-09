import { Password } from "./password.js";

/**
 * Form elements.
 */
const accountDialog = document.querySelector(".account-dialog");
const accountForm = document.querySelector(".account-form");
const pwdInput = document.querySelector("#password");
const confirmPwdInput = document.querySelector("#confirm-password");
const createAccountBtn = document.querySelector(".create-account-btn");
const accountInputs = document.querySelectorAll(".account-form input");
accountDialog.showModal();

/**
 * Form eventlisteners.
 */
[pwdInput, confirmPwdInput].forEach(input => {
    input.addEventListener("input", _ => {
        const pwd = new Password(pwdInput.value);
        const confirmPwd = new Password(confirmPwdInput.value);
        if (confirmPwd.isEqual(pwd)) {
            displayAccountBtnState(true);
            displayPasswordInputState(true);
        } else {
            displayAccountBtnState(false);
            displayPasswordInputState(false);
        }
    });
});

accountInputs.forEach(input => {
    input.addEventListener("input", _ => {
        if (!(accountForm instanceof HTMLInputElement)) {
            return;
        }

        if (accountForm.reportValidity()) {
            createAccountBtn.removeAttribute("disabled");
        } else {
            createAccountBtn.setAttribute("disabled", "");
        }
    });
});

accountForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!(accountForm instanceof HTMLFormElement)) {
        return;
    }

    console.log({
        name: event.target.querySelector("#name"),
        userName: event.target.querySelector("#username"),
        email: event.target.querySelector("#email"),
        pwd: event.target.querySelector("#password"),
        pwdConfirm: event.target.querySelector("#confirm-password"),
    });
});

/**
 * Utility functions
 */

/**
 * Used to display the state of form account button. 
 * @param {bool} isAbledState 
 */
function displayAccountBtnState (isAbledState) {
    if (isAbledState) {
        createAccountBtn.removeAttribute("disabled");
    } else {
        createAccountBtn.setAttribute("disabled", "");
    }
}

/**
 * Used to display password input state, e.g., when password is equal or not.
 * @param {bool} isValidState 
 */
function displayPasswordInputState (isValidState) {
    const invalidInputClass = "invalid-input";
    [pwdInput, confirmPwdInput].forEach(input => {
        if (!(input instanceof HTMLElement)) {
            return;
        }
        if (isValidState) {
            input.classList.remove([invalidInputClass]);
        } else {
            input.classList.add([invalidInputClass]);
        }
    })
}
