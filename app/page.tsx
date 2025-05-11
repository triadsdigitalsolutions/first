
"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from 'framer-motion';
import { clsx,  } from 'clsx'; // Added import for clsx
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: string[]) => {
  return twMerge(clsx(inputs));
};

const Image = ({ src, alt, width, height, className, ...props }: { src: string, alt: string, width?: number | string, height?: number | string, className?: string, [key: string]: any }) => {
    const style: React.CSSProperties = {};
    if (width) {
        style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height) {
        style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return (
        <img
            src={src}
            alt={alt}
            style={style}
            className={className}
            {...props}
        />
    );
};

const HomePage = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

 

    // Hero Section Animation
    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    // Services Cards Animation
    const serviceVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
        whileHover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    };

    // Team Members Animation
    const teamVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    };

    // Portfolio Animation
    const portfolioVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    };

    // Contact Animation
    const contactVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeInOut" } },
    };

    if (!mounted) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    // Define color variables
    const lightMode = {
        background: 'bg-white',
        text: 'text-black',
        primary: 'bg-white',       // White
        primaryForeground: 'text-black', // Black
        secondary: 'bg-dark-green',     // Dark Green
        secondaryForeground: 'text-white', // White
        accent: 'bg-gray-100',
        accentForeground: 'text-black',
        muted: 'bg-gray-100',
        mutedForeground: 'text-gray-600',
        card: 'bg-white',
        border: 'border-gray-200',
        input: 'bg-white',
        ring: 'ring-black',
    };

    const darkMode = {
        background: 'bg-black',
        text: 'text-white',
        primary: 'bg-black',
        primaryForeground: 'text-white',
        secondary: 'bg-dark-green',
        secondaryForeground: 'text-white',
        accent: 'bg-gray-800',
        accentForeground: 'text-white',
        muted: 'bg-gray-800',
        mutedForeground: 'text-gray-400',
        card: 'bg-black',
        border: 'border-gray-800',
        input: 'bg-gray-900',
        ring: 'ring-white',
    };

    // Use dynamic colors based on the theme
    const colors = theme === 'dark' ? darkMode : lightMode;


    return (
        <div className={cn(colors.background, colors.text)}>
            {/* Hero Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={heroVariants}
                className={cn("py-24", colors.primary)}
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className={cn("text-5xl md:text-6xl font-bold", colors.primaryForeground)}>
                                Trigger your ads
                            </h1>
                            <p className={cn("text-xl mt-4", colors.primaryForeground)}>
                                We help businesses thrive in the digital landscape.
                            </p>
                            <Button

                                size="lg"
                                className={cn(
                                    "mt-6",
                                    colors.secondary,
                                    colors.secondaryForeground,
                                    "hover:bg-dark-green/90"
                                )}
                            >
                                Explore Our Services
                            </Button>
                        </div>
                        <div>
                            {/* Hero Image */}
                            <Image
                                width={600}
                                alt="Hero Image"
                                src="/images/triads.png"
                                className='dark:invert'
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Services Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className={cn("text-3xl md:text-4xl font-semibold text-center mb-12", colors.text)}>
                        Our Services
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* SEO Card */}
                        <motion.div
                            variants={serviceVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="whileHover"
                        >
                            <Card className={cn(colors.card, colors.border, "shadow-md")}>
                                <CardHeader>
                                    <Image
                                        alt="SEO"
                                        src="https://audiologydesign.com/wp-content/uploads/2023/03/3.27.23-SEO_jargon.png"
                                        width="100%"
                                        height={200}
                                        className="rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <h3 className={cn("font-bold text-lg", colors.text)}>SEO</h3>
                                    <p className={colors.mutedForeground}>Increase your online visibility with our SEO strategies.</p>
                                </CardBody>
                            </Card>
                        </motion.div>

                        {/* Social Media Marketing Card */}
                        <motion.div
                            variants={serviceVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="whileHover"
                        >
                            <Card className={cn(colors.card, colors.border, "shadow-md")}>
                                <CardHeader>
                                    <Image
                                        alt="Social Media Marketing"
                                        src="https://digitalcatalyst.in/blog/wp-content/uploads/2022/03/major-components-of-digital-marketing.png"
                                        width="100%"
                                        height={200}
                                        className="rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <h3 className={cn("font-bold text-lg", colors.text)}>Social Media Marketing</h3>
                                    <p className={colors.mutedForeground}>Engage your audience and build your brand on social media.</p>
                                </CardBody>
                            </Card>
                        </motion.div>

                        {/* Paid Advertising Card */}
                        <motion.div
                            variants={serviceVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="whileHover"
                        >
                            <Card className={cn(colors.card, colors.border, "shadow-md")}>
                                <CardHeader>
                                    <Image
                                        alt="Paid Advertising"
                                        src="https://www.digimalabs.com/image/paid-ads.jpg"
                                        width="100%"
                                        height={200}
                                        className="rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <h3 className={cn("font-bold text-lg", colors.text)}>Paid Advertising</h3>
                                    <p className={colors.mutedForeground}>Drive targeted traffic to your website with paid ads.</p>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Our Team Section */}
            <div className={cn("py-16", colors.secondary)}>
                <div className="container mx-auto px-4">
                    <h2 className={cn("text-3xl md:text-4xl font-semibold text-center mb-12", colors.text)}>
                        Our Team
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <motion.div
                            variants={teamVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    alt="Team Member 1"
                                    src="/images/unais.jpeg"
                                    width={150}
                                    height={150}
                                    className="rounded-full shadow-md border border-border"
                                />
                                <h4 className={cn("font-bold text-lg mt-4", colors.text)}>MUHAMMED UNAIS P</h4>
                                <p className={colors.mutedForeground}>Founder, Managing Director</p>
                            </div>
                        </motion.div>

                        {/* Team Member 2 */}
                        <motion.div
                            variants={teamVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    alt="Team Member 2"
                                    src="/images/rizvan.jpeg"
                                    width={150}
                                    height={150}
                                    className="rounded-full shadow-md border border-border"
                                />
                                <h4 className={cn("font-bold text-lg mt-4", colors.text)}>AHAMMED RIZVAN K</h4>
                                <p className={colors.mutedForeground}>CO-Founder,Managing Director</p>
                            </div>
                        </motion.div>

                        {/* Team Member 3 */}
                        <motion.div
                            variants={teamVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    alt="Team Member 3"
                                    src="/images/ikleel.jpeg"
                                    width={150}
                                    height={150}
                                    className="rounded-full shadow-md border border-border"
                                />
                                <h4 className={cn("font-bold text-lg mt-4", colors.text)}>MUHAMMED IKLEEL</h4>
                                <p className={colors.mutedForeground}>Co-Founder,CEO</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

               

            {/* Contact Section */}
            <div className={cn("py-16", colors.secondary)}>
                <div className="container mx-auto px-4">
                    <h2 className={cn("text-3xl md:text-4xl font-semibold text-center mb-12", colors.text)}>
                        Contact Us
                    </h2>
                    <div className="flex justify-center">
                        <motion.div
                            variants={contactVariants}
                            initial="hidden"
                            animate="visible"
                            className="md:w-2/3"
                        >
                            <Card className={cn(colors.card, colors.border, "shadow-lg")}>
                                <CardBody>
                                    <p className={cn("text-lg", colors.mutedForeground)}>
                                        Ready to take your digital marketing to the next level?
                                        Contact us today!
                                    </p>
                                    {/* Add a contact form here */}
                                    <div className="flex mt-8">
                                        <div className="w-1/2 pr-8">
                                            <h4 className={cn("font-bold text-md", colors.text)}>Our Address</h4>
                                            <p className={colors.mutedForeground}>
                                                Azad Complex,Edavannappara
                                                <br />
                                                673645
                                            </p>
                                        </div>
                                        <div className="w-1/2">
                                            {/* eslint-disable-next-line */}
                                           <div><iframe style={{width: '100%', height: '200px'}} width="100%" height="200"  scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=trigads%20digital%20solutions+(trigads%20digital%20solutions)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/collections/personal-trackers/">Personl trackers</a></iframe></div>
                                        </div>
                                    </div>
                                    <Button

                                        className={cn(
                                            "mt-8",
                                            colors.primary,
                                            colors.primaryForeground,
                                            "hover:bg-white/90"
                                        )}
                                    >
                                        Get in Touch
                                    </Button>
                                </CardBody>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

