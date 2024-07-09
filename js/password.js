/**
 * A constructor function for creating password instances.
 * @param {string} value 
 */
export function Password(value) {
    if (!new.target) {
        throw new TypeError('Calling Password constructor without new is invalid');
    }
    this.value = removeForbiddenPwdCharacters(value);
}

/**
 * Used to check if password is equal.
 * @param {Password} password 
 * @returns {bool}
 */
Password.prototype.isEqual = function (password) {
    if (password == null || !(password instanceof Password)) {
        return false;
    }
    return this.value === password.value;
}

/**
 * Used to remove password defined invalid characters from a text value. 
 * @param {string} value 
 * @returns {string} a string with only password defined valid characters.
 */
export function removeForbiddenPwdCharacters (value) {
    return value.slice().replace(/\s+/g, "");
}

/**
 * Used to check if a character is inlcuded in defined invalid password
 * characters.
 * @param {string} value 
 * @returns {bool}
 */
export function isForbiddenPwdCharacters(value) {
    return forbiddenPwdCharacters.includes(value);
}

const forbiddenPwdCharacters = [" "];
