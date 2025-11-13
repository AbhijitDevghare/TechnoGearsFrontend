// src/pages/ContactUsPage.js

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import HomeLayout from '../../layout/HomeLayout';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example form submission logic
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  return (
    <>
        <HomeLayout>

        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Your Email"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Your Message"
            rows="6"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>

    
        </HomeLayout>
    </>
  );
};

export default ContactUsPage;
