'use client';
import { useState } from 'react';
import { User, Phone, Mail, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
import SocialDock from '../../components/reactbits/SocialDock';
import Particles from '../../components/reactbits/Particles';
import SplashCursor from '../../components/reactbits/SplashCursor';

export default function ContactSplitPage() {
  const [popup, setPopup] = useState<{ show: boolean; success: boolean }>({
    show: false,
    success: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      name: form.user.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setPopup({ show: true, success: true });
        form.reset();
      } else {
        setPopup({ show: true, success: false });
      }
    } catch {
      setPopup({ show: true, success: false });
    }

    setTimeout(() => setPopup({ show: false, success: false }), 3000);
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 sm:px-8 md:px-20 py-16 sm:py-20 bg-gradient-to-b from-black via-slate-900 to-gray-950 text-cyan-100 overflow-hidden">
      {/* 🌌 Particles Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Particles
          particleColors={['#00FFFF', '#00FFFFB0', '#00FFFF80']}
          particleCount={600}
          particleSpread={20}
          speed={0.8}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation
        />
      </div>

      {/* 💧 Splash Cursor */}
      <SplashCursor />

      {/* ✨ Background GIF */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
          alt="Background Animation"
          className="absolute left-0 top-0 w-full md:w-[50%] h-full object-cover opacity-50 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

{/* 📩 Content */}
<div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl items-center justify-center md:justify-between gap-8 sm:gap-14 md:gap-20 px-4 sm:px-8">
  
  {/* LEFT TEXT */}
<div className="flex flex-col justify-center space-y-4 sm:space-y-6 text-center md:text-left order-first md:order-none w-full md:w-[45%]">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
      Let’s Connect
    </h2>
    <p className="text-cyan-100/80 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
      Have an idea, project, or collaboration in mind?  
      Reach out — I’d love to bring your vision to life.
    </p>
  </div>

  {/* RIGHT FORM */}
  <div className="flex w-full md:flex-[0.8] max-w-2xl">
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full px-2 sm:px-0">
<div className="flex items-center border-b border-cyan-300/30 focus-within:border-cyan-200 transition-all backdrop-blur-[1px] hover:border-cyan-200/40">
        <User className="text-cyan-400 mr-3 shrink-0" size={26} />
        <input
          name="user"
          placeholder="Name"
          className="bg-transparent flex-1 text-cyan-100 text-sm sm:text-base py-2 outline-none placeholder:text-cyan-200/70"
          required
        />
      </div>

<div className="flex items-center border-b border-cyan-300/30 focus-within:border-cyan-200 transition-all backdrop-blur-[1px] hover:border-cyan-200/40">
        <Phone className="text-cyan-400 mr-3 shrink-0" size={26} />
        <input
          name="phone"
          placeholder="Phone Number"
          className="bg-transparent flex-1 text-cyan-100 text-sm sm:text-base py-2 outline-none placeholder:text-cyan-200/70"
        />
      </div>

<div className="flex items-center border-b border-cyan-300/30 focus-within:border-cyan-200 transition-all backdrop-blur-[1px] hover:border-cyan-200/40">
        <Mail className="text-cyan-400 mr-3 shrink-0" size={26} />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="bg-transparent flex-1 text-cyan-100 text-sm sm:text-base py-2 outline-none placeholder:text-cyan-200/70"
          required
        />
      </div>

      <div className="flex items-start border-b border-cyan-400/20 focus-within:border-cyan-300 transition-all">
        <MessageSquare className="text-cyan-400 mr-3 mt-2 shrink-0" size={26} />
        <textarea
          name="message"
          rows={3}
          placeholder="Message"
          className="bg-transparent flex-1 text-cyan-100 text-sm sm:text-base py-2 outline-none placeholder:text-cyan-200/70 resize-none"
          required
        />
      </div>

      <div className="pt-4 sm:pt-6">
        <button
  type="submit"
  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-cyan-400/80 hover:bg-cyan-300 text-black text-sm sm:text-base font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] w-full sm:w-auto"
>
  SEND
</button>

      </div>
    </form>
  </div>
</div>


      {/* ✅ / ❌ Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
  className={`rounded-2xl px-6 sm:px-8 py-4 sm:py-6 backdrop-blur-md border text-center max-w-[90%] sm:max-w-md transition-all duration-500
 ${
              popup.success
                ? 'border-cyan-400/40 bg-black/50 shadow-[0_0_40px_rgba(0,255,255,0.5)]'
                : 'border-red-400/40 bg-black/50 shadow-[0_0_40px_rgba(255,0,0,0.4)]'
            }`}
          >
            {popup.success ? (
              <>
                <CheckCircle2 className="text-cyan-400 mx-auto mb-3" size={50} />
                <p className="text-cyan-100/80 text-lg font-medium">
                  Message sent successfully! 🚀
                </p>
              </>
            ) : (
              <>
                <XCircle className="text-red-400 mx-auto mb-3" size={50} />
                <p className="text-red-200/90 text-lg font-medium">
                  Oops! Something went wrong. Try again.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 sm:mt-6">
        <SocialDock />
      </div>
    </section>
  );
}
