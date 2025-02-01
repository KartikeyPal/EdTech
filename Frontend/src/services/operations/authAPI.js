import {setLoading} from '../../slices/authSlice'
import {apiConnector} from '../apiconnector'
import toast, { Toaster } from 'react-hot-toast'; 
import { settingsEndpoints } from '../apis';
export function getPasswordResetToken(email ,setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",settingsEndpoints.RESETPASSWORD_TOKEN_API,{email} );
            console.log("reset password token response",response);
            if(!response.data.success){
                toast.error("gadbad");
                throw new Error(response.data.message);
            }
            toast.success("Email send successfull");
            setEmailSent(true);
        } catch (error) {
            toast.error("Reset password token error")
            console.log("Reset password token error" );
        }
        dispatch(setLoading(false));
    }
} 
export function resetPassword(password,confirmPassword,token){
    console.log(password,"  ", confirmPassword,"  ", token);
    return async(dispatch)=>{
         dispatch(setLoading(true));
         try {
            const response = await apiConnector("POST",settingsEndpoints.RESETPASSWORD_API,{password,confirmPassword,token})
            console.log("Reset password response" , response);
            if(!response.data.success){
                toast.error("gadbad");
                throw new Error(response.data.message);
            }
            toast.success("password reset successfull");
         } catch (error) {
            toast.error("Reset password  error")
            console.log("Reset password  error" );
        }
    }
}    


export const signUp = (accountType,firstName,lastName,email,password,confirmPassword,otp,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",settingsEndpoints.SIGN_UP_API,{accountType,firstName,lastName,email,password,confirmPassword,otp,navigate});
            if(!response.data.success){
                toast.error("Unable to signup")
                throw new Error(response.data.message);
            }
            toast.success("signUP successfully");
            navigate('/login')
        } catch (error) {
            toast.error("Unable to signup");
            console.log("Unable to signUp :",error);
        }
        dispatch(setLoading(false));
    }
}

export const sendOtp = (email,navigate)=>{
    return async(dispatch)=>{
        try {
            dispatch(setLoading(true));
            const response = await apiConnector("POST",settingsEndpoints.SEND_OTP_API,{email});
            if(!response.data.success){
                toast.error("Unable to signup");
                throw new Error(response.data.message);
            }
            toast.success("OTP sent successfully");
            navigate("/verify-email");
        } catch (error) {
                console.log("error in sending otp",error);
                toast.error("could not send otp");
        }
        dispatch(setLoading(false));
    }
    
}