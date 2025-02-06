// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'http://localhost:4000/api/v1'

export const categories ={
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
}
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL+ "/profile /updateDisplayPicture",
    UPDATE_PROFILE_API:  BASE_URL+ "/profile /updateProfile",
    UPDATE_PASSWORD_API: BASE_URL+ "/auth/reset-password-token",
    DELETE_PROFILE_API:  BASE_URL+ "/profile /deleteProfile",
    RESETPASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    SIGN_UP_API : BASE_URL + "/auth/signup",
    SEND_OTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
}

export const ContactUsEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}