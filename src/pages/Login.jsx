import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as firebaseLogin, fetchCurrentUser } from '../firebase/firebase_auth' 
import  Button  from "../component/Button"
import Input  from "../component/Input"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import {login as storeLogin} from '../feature/authSlice.js'

function Login() {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const login = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await firebaseLogin(data)
            if (res) {
                const currentUser = await fetchCurrentUser()
                if (currentUser) {
                    dispatch(storeLogin(currentUser.displayName))
                    return navigate('/home')
                }
            }
        } catch (error) {
            setError(error)
            return (
                <div>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                </div>

            )
        }
        finally {
            setIsSubmitting(false)
            setValue('')
        }
        console.log(data)
    }

    return (
        <div className='flex items-center justify-center w-4/5 sm:w-full '>
            <div className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-10 border  border-black/50 backdrop-blur-xl bg-white/30 shadow-xl shadow-blue-500/50`}>
                { error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 hover:underline"
                    >
                       Sign up
                    </Link>
                </p>
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            required={true}
                            {...register("email", {
                                required: "Please enter your email",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                            <p role="alert" style={{ color: "red", fontSize: "12px" }}> {errors.email.message}</p>
                        )}

                        <Input
                            label="Password: "
                            type="password"
                            required={true}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Please enter your password",
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && (
                            <p role="alert" style={{ color: "red", fontSize: "12px" }}> {errors.password.message}</p>
                        )}
                        
                        <Button
                            type="submit"
                            text={isSubmitting? "text-black" : "text-white"}
                            className={ !isSubmitting ? `w-full py-2  bg-blue-500 hover:bg-blue-700`: `w-full py-2  bg-gray-400 ` }

                        >{isSubmitting? "Loading...": "Log in"}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login