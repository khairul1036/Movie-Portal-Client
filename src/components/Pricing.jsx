import React from "react";
import { FaCheck, FaStar, FaCrown, FaInfinity } from "react-icons/fa";

const Pricing = () => {
  return (
    <div className="py-16 bg-black text-white px-5">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-500 mb-4">Choose Your Plan</h2>
        <p className="text-xl text-gray-300">
          Select the perfect plan for your movie-watching experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Plan Card Template */}
        {[
          {
            icon: <FaStar className="text-red-500 text-4xl mb-2" />,
            title: "Free",
            description: "Enjoy basic features and explore movies.",
            price: "$0",
            features: [
              "Access to limited movies",
              "Basic search functionality",
              "Watch trailers",
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "bg-gray-600 hover:bg-gray-700",
          },
          {
            icon: <FaCrown className="text-red-500 text-4xl mb-2" />,
            title: "Standard",
            description: "Watch HD movies and manage favorites.",
            price: "$5.99",
            features: [
              "Access to HD movies",
              "Create and manage favorites",
              "Watch trailers",
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-red-500 hover:bg-red-600",
          },
          {
            icon: <FaCrown className="text-yellow-400 text-4xl mb-2" />,
            title: "Premium",
            description: "Enjoy HD + 4K movies and exclusive content.",
            price: "$12.99",
            features: [
              "Access to HD and 4K movies",
              "Create and manage favorites",
              "Exclusive movie releases",
              "Watch full movies",
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-yellow-500 hover:bg-yellow-600",
          },
          {
            icon: <FaInfinity className="text-red-500 text-4xl mb-2" />,
            title: "Ultimate",
            description: "Get unlimited access to all features and content.",
            price: "$19.99",
            features: [
              "Unlimited access to all movies",
              "Exclusive content & early access",
              "Watch movies in 4K",
              "Ad-free experience",
            ],
            buttonText: "Choose Plan",
            buttonStyle: "bg-red-500 hover:bg-red-600",
          },
        ].map((plan, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="text-center mb-4">
              {plan.icon}
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="text-gray-400">{plan.description}</p>
            </div>
            <div className="text-3xl font-bold text-gray-100 text-center mb-6">
              {plan.price}
              <span className="text-base text-gray-400">/month</span>
            </div>
            <ul className="text-gray-300 space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-red-500 mr-2" /> {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <button
                className={`w-full py-3 rounded-md ${plan.buttonStyle} transition duration-300`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
