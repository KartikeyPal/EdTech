import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { MdOutlineFileDownload } from "react-icons/md";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-8 lg:p-12">
                    <div className="text-center">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            Verify Email
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>
                    </div>

                    <form onSubmit={handleOnSubmit} className="mt-8 flex flex-col gap-8">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span className="mx-2">-</span>}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="aspect-square w-12 rounded-md border  border-richblack-300 bg-richblack-700 text-richblack-5 text-center text-[1.5rem] font-semibold focus:border-yellow-50 focus:outline-none"
                                    />
                                )}
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-2 text-richblack-5">    
                               <MdOutlineFileDownload />
                                Back to login
                            </p>
                        </Link>
                        <button
                            onClick={() => dispatch( sendOtp(signupData.email, navigate))}
                            className="flex items-center text-blue-100 gap-2"
                        >
                           <MdOutlineFileDownload />
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail
