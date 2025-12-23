import React, { useEffect, useState } from 'react';

const ABOUT_STORAGE_KEY = 'luxe_about_content';

const defaultAboutContent = {
  story: {
    title: 'Our Story',
    content: 'Founded in 2020, Luxe Collection began with a simple mission: to bring premium fragrances and timeless clothing to discerning customers worldwide.',
  },
  values: [
    { id: 1, title: 'Quality', description: 'Every product is carefully curated for excellence', icon: '✨' },
    { id: 2, title: 'Authenticity', description: 'We partner only with verified, genuine brands', icon: '🎯' },
    { id: 3, title: 'Customer First', description: 'Your satisfaction is our highest priority', icon: '❤️' },
    { id: 4, title: 'Sustainability', description: 'Committed to eco-friendly practices', icon: '🌱' },
  ],
  team: [
    { id: 1, name: 'Sarah Johnson', role: 'Founder & CEO', bio: 'Luxury retail expert with 15+ years experience' },
    { id: 2, name: 'Marcus Lee', role: 'Head of Curation', bio: 'Fragrance specialist and brand curator' },
    { id: 3, name: 'Elena Rodriguez', role: 'Operations', bio: 'Supply chain and logistics strategist' },
    { id: 4, name: 'James Chen', role: 'Customer Experience', bio: 'Dedicated to exceptional service' },
  ],
  achievements: [
    { id: 1, metric: '50K+', label: 'Happy Customers' },
    { id: 2, metric: '500+', label: 'Premium Products' },
    { id: 3, metric: '4.9★', label: 'Average Rating' },
    { id: 4, metric: '150+', label: 'Brand Partners' },
  ],
};

const About = () => {
  const [content, setContent] = useState(defaultAboutContent);

  useEffect(() => {
    const stored = localStorage.getItem(ABOUT_STORAGE_KEY);
    if (stored) setContent(JSON.parse(stored));
  }, []);

  return (
    <div className="bg-dark-main min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-dark-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">About Luxe Collection</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Discover the story behind our luxury marketplace</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{content.story.title}</h2>
              <p className="text-text-secondary text-lg leading-relaxed">{content.story.content}</p>
              <p className="text-text-secondary mt-4">What started as a passion for curating the finest fragrances and clothing has evolved into a global community of luxury enthusiasts. Today, we continue to set the standard for premium, authentic products.</p>
            </div>
            <div className="bg-dark-card border border-white/20 rounded-lg h-80 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="Our story" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-white">Our Core Values</h2>
            <p className="text-text-secondary mt-2">What drives everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((value) => (
              <div key={value.id} className="bg-dark-card border border-white/20 rounded-lg p-6 hover:shadow-white-lg transition-all">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-white">By The Numbers</h2>
            <p className="text-text-secondary mt-2">Our impact and growth</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-dark-card border border-white/20 rounded-lg p-8 text-center hover:shadow-white-lg transition-all">
                <div className="text-4xl font-bold text-white mb-2">{achievement.metric}</div>
                <p className="text-text-secondary">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-white">Meet Our Team</h2>
            <p className="text-text-secondary mt-2">Passionate experts dedicated to excellence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.team.map((member) => (
              <div key={member.id} className="bg-dark-card border border-white/20 rounded-lg overflow-hidden hover:shadow-white-lg transition-all">
                <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <div className="text-5xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-yellow-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-text-secondary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Shop?</h2>
          <p className="text-text-secondary mb-8">Explore our curated collection of premium fragrances and clothing</p>
          <a href="/products" className="inline-block px-8 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-all">
            Browse Products
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
