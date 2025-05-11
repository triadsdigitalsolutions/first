"use client"
import React, { useState} from 'react';
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from 'lucide-react';
import { signIn} from 'next-auth/react';

// Define the form schema using Zod
const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

const LoginForm = () => {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Email/password login using NextAuth
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        
        
        setIsLoading(true);
        setAuthError(null);
        try {
            const result = await signIn('credentials', {
                redirect: true,
                username: data.email,
                password: data.password,
                callbackUrl: '/dashboard',
            });

            if (result?.error) {
                setAuthError(result.error);
            } else if (result?.ok) {
                reset();
              
            }
        } catch (error) {
            setAuthError('An error occurred while logging in. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Google login using NextAuth
    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setAuthError(null);
        try {
            await signIn('google', {redirect:true, callbackUrl: '/dashboard' });
        } catch (error) {
            setAuthError('Google login failed.');
        } finally {
            setGoogleLoading(false);
        }
    };

   
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                    className={errors.email ? "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" : "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.email}
                                    variant='flat'
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Enter your password"
                                    className={errors.password ? "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" : "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.password}
                                />
                            )}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="mx-2 text-gray-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                {/* Google Login Button */}
                <Button
                    type="button"
                    onPress={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={googleLoading}
                    variant="solid"
                >
                    {googleLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in with Google...
                        </>
                    ) : (
                        <>
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48">
                                <g>
                                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.63 2.36 30.18 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.19C12.13 13.41 17.57 9.5 24 9.5z" />
                                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.89-2.17 5.34-4.62 6.99l7.1 5.52C43.98 37.09 46.1 31.36 46.1 24.55z" />
                                    <path fill="#FBBC05" d="M10.67 28.28A14.5 14.5 0 0 1 9.5 24c0-1.49.25-2.93.67-4.28l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.47l7.98-6.19z" />
                                    <path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.14-5.57l-7.1-5.52c-2 1.34-4.56 2.13-8.04 2.13-6.43 0-11.87-3.91-13.33-9.47l-7.98 6.19C6.71 42.18 14.82 48 24 48z" />
                                    <path fill="none" d="M0 0h48v48H0z" />
                                </g>
                            </svg>
                            Continue with Google
                        </>
                    )}
                </Button>

                {/* Auth Error Message */}
                {authError && (
                    <Alert variant="solid" className="mt-4">
                        <p className="text-red-500 text-sm">{authError}</p>
                    </Alert>
                )}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Don't have an account? Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
