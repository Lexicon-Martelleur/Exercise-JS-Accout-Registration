import {
    Password,
    isForbiddenPwdCharacters,
    removeForbiddenPwdCharacters
} from "./password.js";

/**
 * Form elements.
 */

const accountDialog = document.querySelector(".account-dialog");
const accountForm = document.querySelector(".account-form");
const pwdInput = document.querySelector("#password");
const confirmPwdInput = document.querySelector("#confirm-password");
const createAccountBtn = document.querySelector(".create-account-btn");
const accountInputsWithoutPwdInputs = document.querySelectorAll(".account-form input:not([type=password])");
const accountPwdInputs = document.querySelectorAll(".account-form input[type=password]");
accountDialog.showModal();

/**
 * Form eventlisteners.
 */

accountInputsWithoutPwdInputs.forEach(input => {
    input.addEventListener("input", event => {
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        checkAndHandleFormValidityState([
            ...accountInputsWithoutPwdInputs,
            ...accountPwdInputs],
            pwdInput,
            confirmPwdInput
        )
    });
});

accountPwdInputs.forEach(input => {    
    input.addEventListener("input", event => {
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }
        
        if (isForbiddenPwdCharacters(event.data)) {
            event.target.value = removeForbiddenPwdCharacters(
                event.target.value
            );
        }

        checkAndHandleFormValidityState([
            ...accountInputsWithoutPwdInputs,
            ...accountPwdInputs],
            pwdInput,
            confirmPwdInput
        )
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
 * Used to update form display for valid and invalid
 * password state, e.g., disable or enable submit button.
 * @param {HTMLInputElement[]} inputs
 * @param {HTMLInputElement} pwdInput 
 * @param {HTMLInputElement} confirmPwdInput 
 */
function checkAndHandleFormValidityState (
    inputs, pwdInput, confirmPwdInput
) {
    const pwd = new Password(pwdInput.value);
    const confirmPwd = new Password(confirmPwdInput.value);
    let isValidState = true;
    for(let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
            isValidState = false;
            break;
        }
    }

    if (confirmPwd.isEqual(pwd) && isValidState) {
        displayPasswordInputState(true);
        displayAccountBtnState(true);
    } else if (confirmPwd.isEqual(pwd) && !isValidState) {
        displayPasswordInputState(true);
        displayAccountBtnState(false);
    } else {
        displayPasswordInputState(false);
        displayAccountBtnState(false);
    }
}

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
