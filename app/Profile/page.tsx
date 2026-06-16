"use client";
import Image from "next/image";

export default function Home() {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Inner Glow Wellness",
        description: "Healing Hair Oil Formula",
        order_id: order.id,

        handler: async function (response: any) {
          const verify = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const result = await verify.json();

          if (result.success) {
            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-900 to-green-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[30px] shadow-2xl p-6 md:p-8 text-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <div className="w-48 h-48 rounded-3xl bg-[#f5f5f5] flex items-center justify-center">
            <Image
              src="/main.jpeg"
              alt="Healing Hair Oil"
              width={192}
              height={192}
            />
          </div>
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-900 mt-6">
          Fast Hair Growth Formula
        </h1>

        <p className="text-gray-500 mt-2">100% Natural Hair Growth Formula</p>

        {/* Price */}
        <div className="mt-6">
          <span className="text-4xl font-bold text-green-700">₹149</span>

          <span className="ml-3 text-gray-600 line-through">₹999</span>
        </div>

        {/* Features */}
        <div className="mt-6 space-y-2 text-left text-gray-800">
          <p>✅ Control Hair Fall</p>
          <p>✅ Promote Hair Growth</p>
          <p>✅ Reduce Dandruff</p>
          <p>✅ Nourish Scalp</p>
        </div>

        {/* Buy Button */}
        <button
          onClick={handlePayment}
          className="block w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold text-lg text-center"
        >
          Buy Now
        </button>

        {/* WhatsApp Order */}
        <a
          href="https://t.me/InnerGlowwellness"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 border-2 border-green-700 text-green-700 py-4 rounded-2xl font-bold text-center"
        >
          Join Telegram
        </a>
      </div>
    </main>
  );
}
