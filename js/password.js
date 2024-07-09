/**
 * A constructor function for creating password instances.
 * @param {string} value 
 */
export function Password(value) {
    if (!new.target) {
        throw new TypeError('Calling Password constructor without new is invalid');
    }
    this.value = value;
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
