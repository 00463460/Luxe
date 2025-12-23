import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

// Simple local storage for about content
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

const AboutAdmin = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultAboutContent);
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(ABOUT_STORAGE_KEY);
    if (stored) setContent(JSON.parse(stored));
  }, []);

  const saveContent = () => {
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(content));
    setEditingSection(null);
  };

  const updateStory = (field, value) => {
    setContent(prev => ({
      ...prev,
      story: { ...prev.story, [field]: value },
    }));
  };

  const updateValue = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      values: prev.values.map(v => v.id === id ? { ...v, [field]: value } : v),
    }));
  };

  const updateTeam = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      team: prev.team.map(t => t.id === id ? { ...t, [field]: value } : t),
    }));
  };

  const updateAchievement = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, [field]: value } : a),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage About Page</h1>
        <Button onClick={() => navigate('/about')} className="bg-white text-black">View Public</Button>
      </div>

      {/* Story Section */}
      <div className="bg-dark-card border border-white/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Story Section</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={content.story.title}
            onChange={(e) => updateStory('title', e.target.value)}
            className="w-full px-4 py-2 bg-dark-main border border-white/20 text-white rounded"
            placeholder="Section title"
          />
          <textarea
            value={content.story.content}
            onChange={(e) => updateStory('content', e.target.value)}
            rows="4"
            className="w-full px-4 py-2 bg-dark-main border border-white/20 text-white rounded"
            placeholder="Story content"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-dark-card border border-white/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Core Values</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {content.values.map((value) => (
            <div key={value.id} className="bg-dark-main p-4 rounded border border-white/20">
              <input
                type="text"
                value={value.icon}
                onChange={(e) => updateValue(value.id, 'icon', e.target.value)}
                className="w-8 px-2 py-1 bg-dark-card border border-white/20 text-white rounded mb-2"
                maxLength="2"
              />
              <input
                type="text"
                value={value.title}
                onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                value={value.description}
                onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded"
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-dark-card border border-white/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Team Members</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {content.team.map((member) => (
            <div key={member.id} className="bg-dark-main p-4 rounded border border-white/20">
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateTeam(member.id, 'name', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded mb-2"
                placeholder="Name"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => updateTeam(member.id, 'role', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded mb-2"
                placeholder="Role"
              />
              <input
                type="text"
                value={member.bio}
                onChange={(e) => updateTeam(member.id, 'bio', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded"
                placeholder="Bio"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-dark-card border border-white/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {content.achievements.map((achievement) => (
            <div key={achievement.id} className="bg-dark-main p-4 rounded border border-white/20">
              <input
                type="text"
                value={achievement.metric}
                onChange={(e) => updateAchievement(achievement.id, 'metric', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded mb-2 text-lg font-bold"
                placeholder="Metric (e.g., 50K+)"
              />
              <input
                type="text"
                value={achievement.label}
                onChange={(e) => updateAchievement(achievement.id, 'label', e.target.value)}
                className="w-full px-2 py-1 bg-dark-card border border-white/20 text-white rounded"
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={saveContent} className="bg-white text-black px-6">Save Changes</Button>
        <Button onClick={() => navigate('/admin/dashboard')} className="bg-dark-card border border-white/20 text-white px-6">Back</Button>
      </div>
    </div>
  );
};

export default AboutAdmin;
