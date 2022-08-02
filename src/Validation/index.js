export const PHONEREG = /^[0-9\b]+$/;
export const PASSWORD_REG = /^(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[0-9])(?=.*[a-z]).{8,}/;
export const POSTCODE_REG = /^.[a-zA-Z0-9]+$/;
export const EMAIL = /\S+@\S+\.\S+/;
export const TEXT_FIELD = /^[a-z][a-z\s]*$/i;
export const IMAGE = /\.(png)$/;
export const PRICE_NUMBER = /^([+-]?([0-9]*[.])?[0-9]+)$/;
export const URL =/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi