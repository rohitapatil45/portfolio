'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { personalInfo } from '../data/mockData';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  CheckCircle2, MessageSquare, Sparkles,
} from 'lucide-react';

/* Static particle positions — never Math.random() in render */
const PARTICLES = [
  { top: '8%',  left: '7%',  dur: '3.2s', delay: '0s'   },
  { top: '18%', left: '90%', dur: '4.5s', delay: '0.6s' },
  { top: '50%', left: '4%',  dur: '3.8s', delay: '1.0s' },
  { top: '72%', left: '80%', dur: '4.1s', delay: '0.3s' },
  { top: '85%', left: '22%', dur: '3.5s', delay: '1.4s' },
  { top: '38%', left: '95%', dur: '4.8s', delay: '0.8s' },
];

const CONTACT_ITEMS = (info) => [
  { href: `mailto:${info.email}`, Icon: Mail,   label: 'Email Address', value: info.email,    delay: 0.2 },
  { href: `tel:${info.phone}`,    Icon: Phone,  label: 'Phone Number',  value: info.phone,    delay: 0.3 },
  { href: null,                   Icon: MapPin, label: 'Location',      value: info.location, delay: 0.4 },
];

const SOCIALS = (info) => [
  { href: info.github,  Icon: Github,   label: 'GitHub'   },
  { href: info.linkedIn, Icon: Linkedin, label: 'LinkedIn' },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = useCallback(async (data) => {
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1400));
    console.log('Form:', data);
    reset();
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 4500);
  }, [reset]);

  const contactItems = useMemo(() => CONTACT_ITEMS(personalInfo), []);
  const socials      = useMemo(() => SOCIALS(personalInfo), []);

  return (
    <section id="contact" className="py-28 bg-[#0a0a0a] relative overflow-hidden">

      {/* CSS blobs */}
      <div className="blob-a absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[#DC143C]/7 blur-3xl pointer-events-none" />
      <div className="blob-b absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#DC143C]/5 blur-3xl pointer-events-none" />

      {/* CSS particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#DC143C] pointer-events-none"
          style={{ top: p.top, left: p.left, animation: `particle-rise ${p.dur} ease-in-out ${p.delay} infinite`, opacity: 0 }}
        />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,20,60,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220,20,60,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#DC143C]/10 border border-[#DC143C]/25 rounded-full mb-6">
            <MessageSquare size={14} className="text-[#DC143C]" />
            <span className="text-[#DC143C] text-xs font-bold tracking-[0.2em] uppercase">Let&apos;s Talk</span>
          </div>

          <h2 className="text-5xl sm:text-7xl font-bold text-white mb-4 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#FF6B6B]">Touch</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-0.5 bg-gradient-to-r from-[#DC143C] to-[#FF1744] mx-auto mb-5 rounded-full"
            style={{ boxShadow: '0 0 16px rgba(220,20,60,0.5)' }}
          />
          <p className="text-gray-500 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ── Left panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Intro card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/60 relative overflow-hidden group hover:border-[#DC143C]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC143C]/5 rounded-full blur-2xl group-hover:bg-[#DC143C]/10 transition-colors" />
              <Sparkles size={22} className="text-[#DC143C] mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Open to opportunities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Available for full-time roles, freelance projects, and exciting collaborations.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC143C] opacity-40" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC143C]" />
                </span>
                <span className="text-xs text-gray-400">Available now</span>
              </div>
            </div>

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactItems.map((item) => (
                <ContactInfoCard key={item.label} {...item} inView={inView} />
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-medium">Connect</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <SocialBtn key={s.label} {...s} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#141414] to-[#0c0c0c] border border-gray-800/60 overflow-hidden">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#DC143C]/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#DC143C]/5 rounded-full blur-3xl" />

              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Send a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatField
                    label="Full Name" id="name" type="text"
                    reg={register('name', { required: 'Required', minLength: { value: 2, message: 'Min 2 chars' } })}
                    error={errors.name}
                  />
                  <FloatField
                    label="Email Address" id="email" type="email"
                    reg={register('email', {
                      required: 'Required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                    })}
                    error={errors.email}
                  />
                </div>

                <FloatField
                  label="Subject" id="subject" type="text"
                  reg={register('subject', { required: 'Required', minLength: { value: 4, message: 'Min 4 chars' } })}
                  error={errors.subject}
                />

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    {...register('message', { required: 'Required', minLength: { value: 10, message: 'Min 10 chars' } })}
                    id="message" rows={5} placeholder="Tell me about your project…"
                    className="w-full px-4 py-3.5 bg-[#1e1e1e] border border-gray-700/60 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#DC143C]/60 focus:outline-none focus:ring-1 focus:ring-[#DC143C]/20 transition-colors resize-none"
                  />
                  {errors.message && <ErrMsg msg={errors.message.message} />}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 30px rgba(220,20,60,0.35)' } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{ willChange: 'transform' }}
                  className={`w-full relative overflow-hidden py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 shimmer-bar ${
                    status === 'sent'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                      : 'bg-gradient-to-r from-[#DC143C] to-[#e8294a] hover:from-[#e8294a] hover:to-[#DC143C]'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {status === 'sending' && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {status === 'sent'    && <CheckCircle2 size={19} />}
                  {status === 'idle'   && <Send size={17} />}
                  {status === 'sending' ? 'Sending…'         : null}
                  {status === 'sent'    ? 'Message Sent! 🎉' : null}
                  {status === 'idle'    ? 'Send Message'      : null}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* ── Sub-components ──────────────────────────────────────────────── */
const ContactInfoCard = React.memo(({ href, Icon, label, value, delay, inView }) => {
  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-gray-800/60 hover:border-[#DC143C]/35 hover:bg-[#DC143C]/5 transition-all duration-250"
    >
      <div className="p-2.5 rounded-lg bg-[#DC143C]/10 border border-[#DC143C]/15 group-hover:bg-[#DC143C]/20 transition-colors flex-shrink-0">
        <Icon size={18} className="text-[#DC143C]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium truncate">{value}</p>
      </div>
    </motion.div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
});
ContactInfoCard.displayName = 'ContactInfoCard';

const SocialBtn = React.memo(({ href, Icon, label }) => (
  <a
    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#141414] border border-gray-800/60 hover:border-[#DC143C]/40 hover:bg-[#DC143C]/8 transition-all duration-200"
  >
    <Icon size={18} className="text-gray-400 group-hover:text-[#DC143C] transition-colors" />
    <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{label}</span>
  </a>
));
SocialBtn.displayName = 'SocialBtn';

const FloatField = React.memo(({ label, id, type, reg, error }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">{label}</label>
    <input
      {...reg} type={type} id={id}
      className="w-full px-4 py-3.5 bg-[#1e1e1e] border border-gray-700/60 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#DC143C]/60 focus:outline-none focus:ring-1 focus:ring-[#DC143C]/20 transition-colors"
    />
    {error && <ErrMsg msg={error.message} />}
  </div>
));
FloatField.displayName = 'FloatField';

const ErrMsg = ({ msg }) => (
  <p className="mt-1.5 text-[#DC143C] text-xs flex items-center gap-1.5">
    <span className="w-1 h-1 rounded-full bg-[#DC143C]" />
    {msg}
  </p>
);

export default Contact;