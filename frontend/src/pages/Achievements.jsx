import React from 'react'

function Achievements() {
  return (
    <div>
      <div className="max-w-5xl mx-auto my-8 p-6 border-2 border-green-500 rounded-2xl bg-white shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Our Early Achievements</h2>
        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>Since its inception, <strong>ZeroWasteHub</strong> has grown into more than just a platform — it's a community-driven initiative that believes in reducing waste and empowering lives. Here's what we've achieved in our early journey:</p>

          <ul className="list-disc list-inside space-y-2">
            <li><strong>Over 30 kg of surplus food</strong> rescued and redirected to families and shelters across Pune — reducing both hunger and food waste.</li>
            <li><strong>25+ clothing items and daily-use essentials</strong> — including jackets, shoes, and school bags — donated by local citizens and businesses.</li>
            <li><strong>10+ educational supplies</strong> such as books, notebooks, and stationery distributed to under-resourced schools and kids in need.</li>
            <li><strong>15+ families supported</strong> through timely donations of food, clothes, and household goods during community drives.</li>
            <li><strong>5+ active volunteers</strong> helping coordinate pickups, manage logistics, and build awareness through social media and events.</li>
            <li><strong>40+ successful donations</strong> matched via our real-time donation and request system — built using MERN stack technology.</li>
            <li><strong>1 local NGO partner</strong> currently onboard, helping manage distribution hubs and identify verified receivers.</li>
            <li><strong>15+ pickup-and-drop cycles</strong> completed by volunteers and donor drop-offs at fixed community centers.</li>
            <li><strong>100+ kg of waste diverted</strong> from landfills — contributing directly to our goals of sustainability and mindful consumption.</li>
            <li><strong>Heartfelt stories</strong> from both donors and receivers that show how simple acts of kindness can create a lasting impact.</li>
            <li><strong>85% success rate</strong> on matching donations with real needs — and we’re constantly improving through user feedback.</li>
          </ul>

          <p className="mt-4 font-semibold text-green-700">
            At ZeroWasteHub, every action counts. We may be early in our journey, but the results are proof that when people come together, change is possible.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Achievements;
