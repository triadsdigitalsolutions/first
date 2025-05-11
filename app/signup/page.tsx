"use client"
import React, { useState } from 'react';
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firabase';
// NextAuth imports
import { signIn } from "next-auth/react";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const SignupPage = () => {
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setFirebaseError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const { user } = userCredential;

            const userCollectionRef = collection(db, 'USERS');
            
            await addDoc(userCollectionRef,{
                username: user.displayName || data.email.split('@')[0],
                email: user.email,
                user_id: user.uid,
                role: 'student',
                isActive: true,
                createdAt: new Date(),
                address:"",
                phoneNumber:user.phoneNumber || "",
            });

            reset();
            router.push('/login');
        } catch (error) {
            const fbError = error as FirebaseError;
            switch (fbError.code) {
                case 'auth/email-already-in-use':
                    setFirebaseError('Email address is already in use.');
                    break;
                case 'auth/invalid-email':
                    setFirebaseError('Invalid email address.');
                    break;
                case 'auth/weak-password':
                    setFirebaseError('Password is too weak.');
                    break;
                default:
                    setFirebaseError('An error occurred while signing up. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for Google login via NextAuth
    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Sign Up</h2>
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

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Confirm your password"
                                    className={errors.confirmPassword ? "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" : "mt-1 w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
                                    disabled={isSubmitting}
                                    aria-invalid={!!errors.confirmPassword}
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing up...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                {/* Google Login Button */}
                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                    <svg className="h-5 w-5" viewBox="0 0 48 48">
                        <g>
                            <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.21 2.36 30.51 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.17 13.13 17.61 9.5 24 9.5z"/>
                            <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.44c-.54 2.92-2.18 5.39-4.66 7.06l7.2 5.6C43.89 37.13 46.1 31.38 46.1 24.55z"/>
                            <path fill="#FBBC05" d="M10.67 28.64c-1.13-3.33-1.13-6.95 0-10.28l-7.98-6.2C.99 16.09 0 19.92 0 24s.99 7.91 2.69 11.84l7.98-6.2z"/>
                            <path fill="#EA4335" d="M24 48c6.51 0 12.21-2.15 16.21-5.85l-7.2-5.6c-2.01 1.35-4.59 2.15-9.01 2.15-6.39 0-11.83-3.63-14.33-8.94l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                        </g>
                    </svg>
                    Sign up with Google
                </Button>

                {/* Firebase Error Message */}
                {firebaseError && (
                    <Alert variant="solid" className="mt-4">
                        <p className="text-red-500 text-sm">{firebaseError}</p>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default SignupPage;
