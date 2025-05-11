"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Modal, ModalHeader, ModalBody, ModalContent } from '@heroui/modal';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/use-disclosure';
import Script from "next/script";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firabase";

type Course = {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: string,
};

type CourseCardProps = {
    title: string;
    price: string;
    description: string;

    onBuy: () => void;
};

const CourseCard = ({ title, price, description, onBuy, imageUrl }: CourseCardProps & { imageUrl: string }) => (
    <Card className="w-full max-w-sm mx-auto shadow-xl border border-gray-200 rounded-2xl flex flex-col bg-white hover:shadow-2xl transition-shadow duration-300">
        {imageUrl && (
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                />
                <span className="absolute top-3 right-3 bg-white/80 text-green-700 font-bold px-3 py-1 rounded-full text-sm shadow">
                    {price}
                </span>
            </div>
        )}
        <CardHeader className="px-6 pt-4 pb-2 flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-gray-900 truncate">{title}</h2>
        </CardHeader>
        <CardBody className="px-6 pb-4 flex-1">
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        </CardBody>
        <CardFooter className="px-6 pb-6">
            <Button
                color="primary"
                className="w-full rounded-lg font-semibold text-base py-2 shadow-md hover:bg-primary-700 transition"
                onPress={onBuy}
            >
                Enroll Now
            </Button>
        </CardFooter>
    </Card>
);

const CoursesPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{ title: string; price: string } | null>(null);
    const [form, setForm] = useState({ name: "", mobile: "", address: "" });

    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, "COURSES"));
            const fetchedCourses: Course[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedCourses.push({
                    id: doc.id,
                    title: data.title,
                    price: `₹${data.price}`,
                    description: data.description,
                    imageUrl: data.imageUrl,
                });
            });
            setCourses(fetchedCourses);
        };
        fetchCourses();
    }, []);

    const handleBuy = (course: { title: string; price: string }) => {
        setSelectedCourse(course);
        onOpen();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const getAmountInPaise = (price: string) => {
        const num = Number(price.replace(/[^\d]/g, ""));
        return num * 100;
    };

    const handlePayNow = async () => {
        if (!selectedCourse) return;
        const options = {
            key: "rzp_test_7yQ80fi9OaVih4",
            key_id: "rzp_test_7yQ80fi9OaVih4",
            amount: getAmountInPaise(selectedCourse.price),
            currency: "INR",
            name: selectedCourse.title,
            description: "Course Purchase",
            image: "/images/triads.png",
            order_id: "",
            handler: function (response: any) {
                console.log("Payment successful:", response);
                alert("payment was successfull");
            },
            prefill: {
                name: form.name,
                contact: form.mobile,
                email: "",
            },
        };
        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        title={course.title}
                        price={course.price}
                        imageUrl={course.imageUrl}
                        description={course.description}
                        onBuy={() => handleBuy(course)}
                    />
                ))}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Course Purchase</ModalHeader>
                            <ModalBody>
                                {selectedCourse && (
                                    <div className="mb-4 p-3 bg-gray-100 rounded">
                                        <div className="font-semibold text-lg">{selectedCourse.title}</div>
                                        <div className="text-green-600 font-medium">{selectedCourse.price}</div>
                                    </div>
                                )}
                                <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handlePayNow(); }}>
                                    <Input
                                        label="Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <Input
                                        label="Mobile Number"
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        required
                                        type="tel"
                                        pattern="[0-9]{10}"
                                    />
                                    <Input
                                        label="Address"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button color="primary" type="submit" className="mt-2 w-full">
                                        Pay Now
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        </div>
    );
};

export default CoursesPage;
