import React from "react";
import { Link } from "react-router-dom";
import { FaRecycle, FaHandsHelping, FaLeaf } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-white text-gray-800">

    
      <section className="bg-green-100 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          Welcome to ZeroWasteHub
        </h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Empowering communities by reducing waste and connecting resources where they’re needed most.
        </p>
        <div className="mt-6">
          <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded-md text-lg hover:bg-green-700">
            Join the Movement
          </Link>
        </div>
      </section>

     
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 text-green-800">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div>
            <FaRecycle className="text-green-600 mx-auto text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Donate</h3>
            <p>Individuals or businesses list surplus items like food, clothes, or books.</p>
          </div>
          <div>
            <FaHandsHelping className="text-green-600 mx-auto text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p>NGOs and communities in need get matched based on location and priority.</p>
          </div>
          <div>
            <FaLeaf className="text-green-600 mx-auto text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Create Impact</h3>
            <p>Resources are reused, waste is reduced, and communities benefit sustainably.</p>
          </div>
        </div>
      </section>

      
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-green-800">Why ZeroWasteHub?</h2>
          <p className="text-lg text-gray-700">
            Built by students, inspired by real-world challenges. We’re a tech-for-good platform that believes sustainability starts with simple action.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Ready to make a difference?</h2>
        <p className="mb-6 text-lg">Create an account or log in to start donating or receiving today.</p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="bg-green-600 text-white px-5 py-3 rounded-md hover:bg-green-700">Sign Up</Link>
          <Link to="/login" className="border border-green-600 text-green-700 px-5 py-3 rounded-md hover:bg-green-600 hover:text-white">Log In</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
