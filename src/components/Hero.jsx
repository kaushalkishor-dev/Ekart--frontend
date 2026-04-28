import React from "react";
import { Button } from "./ui/button";
import heroImg from "./computer-travel-agency-office-table.jpg";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      
      {/* container */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* grid layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Latest Electronics at Best Prices
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <img
              src={heroImg}
              alt="Hero"
              className="w-[350px] md:w-[450px] rounded-xl shadow-2xl mt-20"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;










