import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  darkMode: boolean;
  onSubmit?: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'virender.sonu.gupta@gmail.com',
      href: 'mailto:virender.sonu.gupta@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXXXXXXXXX',
      href: 'tel:+91'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Punjab, India',
      href: '#'
    }
  ];

  return (
    <section id="contact" className={`py-20 px-6 scroll-mt-20 ${darkMode ? 'bg-gray-800/30' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-12 max-w-2xl mx-auto`}>
          Have a project in mind or just want to say hello? Feel free to reach out. I'm always interested in new opportunities and collaborations.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                      darkMode
                        ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50'
                        : 'bg-white border border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      darkMode ? 'bg-blue-500/10' : 'bg-blue-100'
                    }`}>
                      <method.icon className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{method.label}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className={`border rounded-xl p-6 ${
              darkMode
                ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20'
                : 'bg-blue-50 border-blue-100'
            }`}>
              <h3 className="font-bold mb-3">Response Time</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                I aim to respond to all messages within 24-48 hours. Let me know what you're working on!
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/urivgupta"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all ${
                  darkMode
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Connect on LinkedIn
              </a>
              <a
                href="https://github.com/Uriv7"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all ${
                  darkMode
                    ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Follow on GitHub
              </a>
            </div>
          </div>

          <div className={`border rounded-xl p-8 ${
            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500 transition-colors ${
                    darkMode
                      ? 'bg-gray-900 border-gray-700 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500 transition-colors ${
                    darkMode
                      ? 'bg-gray-900 border-gray-700 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500 transition-colors ${
                    darkMode
                      ? 'bg-gray-900 border-gray-700 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-2 rounded-lg border outline-none focus:border-blue-500 transition-colors resize-none ${
                    darkMode
                      ? 'bg-gray-900 border-gray-700 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>

              {submitted && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
