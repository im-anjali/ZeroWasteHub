import React from "react";
import { FaLeaf, FaHandsHelping, FaRoute, FaUserFriends, FaGlobeAsia } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-green-700">About ZeroWasteHub</h1>

        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Journey</h2>
          <p className="text-lg leading-relaxed">
            We are a team of computer science undergraduates who first experienced the real-world impact of waste during our social internships in the first year of college. Working closely with NGOs, we saw a huge gap between the surplus many had and the unmet needs of vulnerable communities.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            That experience inspired us to create <strong>ZeroWasteHub</strong> — a tech-driven solution to reduce waste, promote sustainability, and connect people in meaningful ways.
          </p>
        </section>

        
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 text-green-800">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our mission is to ensure that no usable item — whether it’s food, clothing, or books — goes to waste. We aim to bridge the gap between those with surplus and those in need through an efficient, community-powered digital platform.
          </p>
        </section>

      
        <section className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">What Makes Us Different</h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-3 text-lg text-gray-700">
              <FaUserFriends className="text-green-700 mt-1" />
              <span>Built by students, rooted in real social experience</span>
            </div>
            <div className="flex items-start gap-3 text-lg text-gray-700">
              <FaHandsHelping className="text-green-700 mt-1" />
              <span>Real-time donor-NGO matching system</span>
            </div>
            <div className="flex items-start gap-3 text-lg text-gray-700">
              <FaRoute className="text-green-700 mt-1" />
              <span>Zone-based routing with local impact awareness</span>
            </div>
            <div className="flex items-start gap-3 text-lg text-gray-700">
              <FaGlobeAsia className="text-green-700 mt-1" />
              <span>Transparent donation tracking across regions</span>
            </div>
            <div className="flex items-start gap-3 text-lg text-gray-700">
              <FaLeaf className="text-green-700 mt-1" />
              <span>Community-first, eco-conscious design</span>
            </div>
          </div>
        </section>

     
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            We envision a future where sustainable giving is effortless, community-driven, and accessible to everyone. Where technology bridges gaps in society — and where young minds lead the change toward a zero-waste world.
          </p>
        </section>

        <section className="border-t pt-6 text-sm text-gray-600">
          <p>
            Want to connect, collaborate, or contribute? Email us at{" "}
            <a
              href="mailto:contact@zerowastehub.org"
              className="text-green-700 hover:underline"
            >
              contact@zerowastehub.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;

