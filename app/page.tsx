"use client";


import Image from "next/image";
import { useEffect, useState } from "react";

interface MediaItem {
  url: string;
  pathname: string;
}

export default function Home() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/blob-media');
        const data = await response.json();
        setImages(data.images || []);
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {videos.length > 0 && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videos[0].url} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            🌿 Welcome to <span className="text-blue-300">The Lake Residences</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Luxury Living Amidst Nature – Thalangama Lakefront, Sri Jayawardenepura Kotte
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 inline-block">
            <p className="text-lg font-medium">📍 Address:</p>
            <p className="text-xl font-bold">524/A/1, Thesath Mawatha, Lake Road, Baththaramulla</p>
            <p className="text-lg">Sri Jayawardenepura Kotte, Sri Lanka</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            🏡 Experience Lakefront Living Like Never Before
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nestled on the edge of the breathtaking <strong>Thalangama Lake</strong>, <strong>The Lake Residences</strong> offers an unmatched blend of modern luxury and serene natural beauty. Located in the heart of <strong>Baththaramulla</strong>, just minutes from the administrative capital, this exclusive collection of <strong>four fully furnished luxury apartments</strong> is where elegance meets tranquility.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        {images.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Property Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={image.url}
                    alt={`Lake Residences ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Gallery */}
        {videos.length > 1 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Property Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.slice(1).map((video, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden shadow-lg">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-64 object-cover"
                  >
                    <source src={video.url} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* About Thalangama Lake */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8">
            <h2 className="text-4xl font-bold mb-6">🌊 About Thalangama Lake – A Hidden Natural Treasure</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Thalangama Lake is more than just a body of water – it's a <strong>living canvas of biodiversity</strong>, peace, and natural charm. Declared a <strong>protected wetland</strong>, the area is a sanctuary for nature lovers and those seeking a mindful escape from the city's hustle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🐦</span>
                  <div>
                    <h4 className="font-bold text-lg">Birdwatcher's Paradise</h4>
                    <p>Home to over 100 species of native and migratory birds – from vibrant kingfishers and herons to rare cormorants and storks.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <h4 className="font-bold text-lg">Lush Greenery & Paddy Fields</h4>
                    <p>Surrounded by expansive paddy fields and swaying coconut trees, it offers a view that changes with the seasons.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🐢</span>
                  <div>
                    <h4 className="font-bold text-lg">Rich Biodiversity</h4>
                    <p>The lake ecosystem nurtures butterflies, dragonflies, turtles, and even the occasional water monitor.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🚴‍♂️</span>
                  <div>
                    <h4 className="font-bold text-lg">Nature Trails & Lake Walks</h4>
                    <p>Ideal for walking, jogging, and cycling. Enjoy peaceful mornings or romantic evening strolls by the lake.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <h4 className="font-bold text-lg">Photography & Mindfulness Haven</h4>
                    <p>A favorite among landscape photographers, birders, and yogis, this area offers endless inspiration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apartment Features */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              🛋️ About The Apartments – A Private Slice of Paradise
            </h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Each of the <strong>4 luxurious apartments</strong> is designed to offer maximum comfort and uninterrupted views of Thalangama Lake.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🪟", title: "Panoramic Lake Views", desc: "Private balcony or living space" },
                { icon: "🛏️", title: "Fully Furnished", desc: "Ready to move in with premium furniture" },
                { icon: "❄️", title: "Air Conditioned", desc: "Light-filled rooms with climate control" },
                { icon: "🍽️", title: "Modern Kitchens", desc: "Granite countertops and high-end appliances" },
                { icon: "🚿", title: "Luxury Bathrooms", desc: "Designer fittings and premium finishes" },
                { icon: "📶", title: "Smart Features", desc: "High-Speed Wi-Fi and modern amenities" },
                { icon: "🔒", title: "Private & Secure", desc: "Gated building with CCTV surveillance" },
                { icon: "🅿️", title: "Ample Parking", desc: "Space for residents and guests" },
                { icon: "🌿", title: "Green Neighborhood", desc: "Quiet area with urban convenience" }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Benefits */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
            <h2 className="text-4xl font-bold mb-6 text-center">🧭 Prime Location – Perfect Balance of Peace & Accessibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚗</span>
                  <p>5 minutes to <strong>Battaramulla town</strong>, supermarkets, and restaurants</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏫</span>
                  <p>Close to leading international schools and government institutions</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏥</span>
                  <p>Easy access to top hospitals and wellness centers</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛣️</span>
                  <p>Quick routes to Colombo city and expressways</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">✨ Why Choose The Lake Residences?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "The calm of nature + the convenience of the city",
                "A protected, ever-green environment at your doorstep",
                "A rare chance to live on the edge of a preserved lake ecosystem",
                "A turnkey luxury apartment in a low-density, exclusive building"
              ].map((reason, index) => (
                <div key={index} className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg">
                  <span className="text-green-600 text-xl">✅</span>
                  <p className="text-gray-800 font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">📞 Schedule a Viewing or Inquire Now!</h2>
            <p className="text-xl mb-8">
              Don't miss your chance to own a rare lakeside apartment in one of Sri Lanka's most scenic urban areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors text-lg">
                Schedule Viewing
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-colors text-lg">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading media...</p>
          </div>
        </div>
      )}
    </div>
  );
}