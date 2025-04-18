import {setLoading} from '../../slices/authSlice';
import {apiConnector} from '../apiconnector';
import toast, { Toaster } from 'react-hot-toast'; 
import { settingsEndpoints } from '../apis';
import {setUser} from '../../slices/profileSlice';
import { setToken } from '../../slices/authSlice';
import {resetCart} from '../../slices/cartSlice';
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
    console.log(email," my email")
    const toastId = toast.loading("Loading...");
    return async(dispatch)=>{
        try {
            dispatch(setLoading(true));
            const response = await apiConnector("POST",settingsEndpoints.SEND_OTP_API,{email});
            console.log(response);
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
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
    
}

export const logIn = (email,password,navigate)=>{
    return async(dispatch)=>{
        try {
            dispatch(setLoading(true));
            const res = await apiConnector("POST",settingsEndpoints.LOGIN_API,{email,password});
            
            if(!res.data.success){
                toast.error("unable to login");
                throw new Error(res.data.message);
            }
            toast.success("logIn successfull");
            dispatch(setToken(res.data.token));
            const image = res.data.existingUser.image;
            dispatch(setUser({...res.data.existingUser,image:image}));

            
            localStorage.setItem("token",JSON.stringify(res.data.token)); 
            localStorage.setItem("user",JSON.stringify(res.data.existingUser));

            navigate('/dashboard/my-profile');
        } catch (error) {
            if(error.response.data.message === "User does not exist"){
                toast.error("User does not exist, please signUp")
                navigate("/Signup")
                return;
            }
            console.log("Error while login",error);
            toast.error("not able to login");
        }
        dispatch(setLoading(false));
    }
}
export const logOut = (navigate)=>{
    return async(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("logged Out successfully");
        navigate('/')
    }
}