
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { personalInfo } from '../data/mockData';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Sparkles } from 'lucide-react';
// import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    // toast({
    //   title: 'Message Sent!',
    //   description: "Thank you for reaching out. I'll get back to you soon!",
    // });
    reset();
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-15"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#DC143C] rounded-full blur-3xl opacity-15"
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#DC143C] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div className="inline-block relative">
            <h2
              className="text-5xl sm:text-7xl font-bold text-white mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Get In{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF1744] relative">
                Touch
                <motion.div
                  className="absolute -top-6 -right-10"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="text-[#DC143C]" size={28} />
                </motion.div>
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-32 h-1.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto rounded-full mb-8"
            style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Have a project in mind or want to collaborate? Let's connect!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <motion.h3
                className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-2 h-2 bg-[#DC143C] rounded-full"
                />
                Contact Information
              </motion.h3>

              <div className="space-y-6">
                {/* Email */}
                <ContactInfoCard
                  href={`mailto:${personalInfo.email}`}
                  icon={<Mail className="text-[#DC143C]" size={24} />}
                  label="Email"
                  value={personalInfo.email}
                  delay={0.3}
                  inView={inView}
                />

                {/* Phone */}
                <ContactInfoCard
                  href={`tel:${personalInfo.phone}`}
                  icon={<Phone className="text-[#DC143C]" size={24} />}
                  label="Phone"
                  value={personalInfo.phone}
                  delay={0.4}
                  inView={inView}
                />

                {/* Location */}
                <ContactInfoCard
                  icon={<MapPin className="text-[#DC143C]" size={24} />}
                  label="Location"
                  value={personalInfo.location}
                  delay={0.5}
                  inView={inView}
                />
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-[#DC143C] rounded-full"
                />
                Connect With Me
              </h3>
              <div className="flex gap-6">
                <SocialButton
                  href={personalInfo.github}
                  icon={<Github size={24} />}
                  label="GitHub"
                  delay={0.7}
                />
                <SocialButton
                  href={personalInfo.linkedIn}
                  icon={<Linkedin size={24} />}
                  label="LinkedIn"
                  delay={0.8}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 relative"
            >
              {/* Background glow */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#DC143C]/10 via-[#FF1744]/10 to-[#DC143C]/10 rounded-3xl blur-2xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative">
                {/* Name */}
                <FormField
                  label="Your Name"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  register={register('name', { required: 'Name is required' })}
                  error={errors.name}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                {/* Email */}
                <FormField
                  label="Your Email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  register={register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={errors.email}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                {/* Subject */}
                <FormField
                  label="Subject"
                  id="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  register={register('subject', { required: 'Subject is required' })}
                  error={errors.subject}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-3 flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        rotate: focusedField === 'message' ? 360 : 0,
                      }}
                      className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"
                    />
                    Message
                  </label>
                  <motion.textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-2xl text-white focus:border-[#DC143C] focus:outline-none transition-all resize-none"
                    whileFocus={{
                      boxShadow: '0 0 30px rgba(220, 20, 60, 0.3)',
                      scale: 1.01,
                    }}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#DC143C] text-sm mt-2 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#DC143C] rounded-full" />
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#DC143C] via-[#FF1744] to-[#DC143C]"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <div className="relative px-8 py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-semibold text-lg">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Send size={20} />
                        </motion.div>
                        <span>Send Message</span>
                      </>
                    )}
                  </div>

                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      boxShadow: '0 0 40px rgba(220, 20, 60, 0.8)',
                    }}
                  />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Info Card Component
const ContactInfoCard = ({ href, icon, label, value, delay, inView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const card = (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, x: 15 }}
      className="relative flex items-center gap-5 p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-gray-800 hover:border-[#DC143C] transition-all group overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-[#DC143C]/20 rounded-full blur-3xl"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />

      <motion.div
        className="p-4 bg-gradient-to-br from-[#DC143C]/20 to-[#DC143C]/5 rounded-xl relative z-10"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <div className="relative z-10">
        <div className="text-gray-400 text-sm font-medium mb-1">{label}</div>
        <div className="text-white font-semibold text-lg">{value}</div>
      </div>

      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        }}
      />
    </motion.div>
  );

  return href ? (
    <a href={href} className="block">
      {card}
    </a>
  ) : (
    card
  );
};

// Social Button Component
const SocialButton = ({ href, icon, label, delay }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', bounce: 0.6 }}
      whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="relative p-5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-gray-800 hover:border-[#DC143C] transition-all group overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-[#DC143C]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.2 }}
      />
      <div className="relative z-10 text-gray-400 group-hover:text-[#DC143C] transition-colors">
        {icon}
      </div>

      {/* Tooltip */}
      <motion.span
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#DC143C] text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
};

// Form Field Component
const FormField = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  focusedField,
  setFocusedField,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-white font-medium mb-3 flex items-center gap-2"
      >
        <motion.div
          animate={{
            rotate: focusedField === id ? 360 : 0,
          }}
          className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"
        />
        {label}
      </label>
      <motion.input
        {...register}
        type={type}
        id={id}
        placeholder={placeholder}
        onFocus={() => setFocusedField(id)}
        onBlur={() => setFocusedField(null)}
        className="w-full px-6 py-4 bg-[#1a1a1a] border border-gray-800 rounded-2xl text-white focus:border-[#DC143C] focus:outline-none transition-all"
        whileFocus={{
          boxShadow: '0 0 30px rgba(220, 20, 60, 0.3)',
          scale: 1.01,
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#DC143C] text-sm mt-2 flex items-center gap-2"
        >
          <span className="w-1 h-1 bg-[#DC143C] rounded-full" />
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default Contact;