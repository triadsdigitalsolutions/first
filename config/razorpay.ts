import Razorpay from "razorpay";

// key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY,
function RazorpayWindow() {
    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY,
    });
    return razorpay;
}
export default RazorpayWindow;