import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, login as firebaseLogin, fetchCurrentUser } from "../firebase/firebase_auth";
import Button from "../component/Button";
import Input from "../component/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../feature/authSlice.js";

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const signup = async (data) => {
        setIsSubmitting(true);
        setError(""); 
        try {
             await signUp(data);
            const loginRes = await firebaseLogin(data);
            if (!loginRes) throw new Error("Login failed. Please try again.");
            const currentUser = await fetchCurrentUser();
            if (!currentUser) throw new Error("Failed to retrieve current user.");
          
            dispatch(storeLogin(currentUser.displayName));
            navigate("/home");
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-4/5 sm:w-full">
            <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-300 dark:border-gray-700 shadow-xl">
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200">Sign up</h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-medium text-blue-600 dark:text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Login now
                    </Link>
                </p>
                <form onSubmit={handleSubmit(signup)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            required={true}
                            placeholder="Enter your full name"
                            {...register("name", { required: "Full name is required!" })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            required={true}
                            {...register("email", {
                                required: "Please enter your email",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                        <Input
                            label="Password:"
                            type="password"
                            required={true}
                            placeholder="Enter your password"
                            {...register("password", { required: "Please enter your password" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                        <Button
                            type="submit"
                            className={`w-full py-2 ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"} text-white`}
                            disabled={isSubmitting}
                        >
                        {isSubmitting ? "Loading..." : "Sign up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
