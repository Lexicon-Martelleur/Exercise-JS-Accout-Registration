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
const viewConfirmedPassword = document.querySelector(".view-password");
accountDialog.showModal();

/**
 * Form eventlisteners.
 */

viewConfirmedPassword.addEventListener("click", event => {
    [...event.currentTarget.children].forEach(element => {
        element instanceof HTMLElement && element.classList.toggle(["hide"]);
        console.log(confirmPwdInput.getAttribute("type"));
    })
    confirmPwdInput.getAttribute("type") === "password"
        ? confirmPwdInput.setAttribute("type", "text")
        : confirmPwdInput.setAttribute("type", "password");
})

accountInputsWithoutPwdInputs.forEach(input => {
    input.addEventListener("input", event => {
        if (!(event.currentTarget instanceof HTMLInputElement)) {
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
        if (!(event.currentTarget instanceof HTMLInputElement)) {
            return;
        }
        
        if (isForbiddenPwdCharacters(event.data)) {
            event.currentTarget.value = removeForbiddenPwdCharacters(
                event.currentTarget.value
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
        name: event.currentTarget.querySelector("#name").value,
        userName: event.currentTarget.querySelector("#username").value,
        email: event.currentTarget.querySelector("#email").value,
        pwd: event.currentTarget.querySelector("#password").value,
        pwdConfirm: event.currentTarget.querySelector("#confirm-password").value,
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
