import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Scissors, Instagram, Facebook } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AnimatedHeroProps {
  onBookClick: () => void;
  backgroundImage?: string;
  logo?: string;
}

export function AnimatedHero({ onBookClick, backgroundImage, logo }: AnimatedHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const xParallax = useTransform(x, [-0.5, 0.5], [-20, 20]);
  const yParallax = useTransform(y, [-0.5, 0.5], [-20, 20]);

  const defaultBg =
    'https://images.unsplash.com/photo-1667539916671-b9e7039ccee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyNDcxNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 10px)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ x: xParallax, y: yParallax }}
      >
        <ImageWithFallback
          src={backgroundImage || defaultBg}
          alt="Barbershop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at var(--x) var(--y), rgba(245, 158, 11, 0.3), transparent 50%)',
          }}
          animate={{
            '--x': `${mousePosition.x}px`,
            '--y': `${mousePosition.y}px`,
          } as any}
        />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <motion.nav
          className="flex items-center justify-between px-6 md:px-12 py-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            {logo ? (
              <motion.img
                src={logo}
                alt="Logo"
                className="h-12 w-auto"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Scissors className="w-8 h-8 text-amber-500" />
              </motion.div>
            )}
            <span className="text-2xl tracking-wider">ELITE CUTS</span>
          </div>
          <div className="flex gap-4">
            {[Instagram, Facebook].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6 cursor-pointer hover:text-amber-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.nav>

        {/* Hero Text */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl mb-6 tracking-[0.1em] overflow-hidden">
                {/* GUPITAN NG */}
                {'GUPITAN NG'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-[length:200%_100%]">
                  <motion.span
                    className="inline-block"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #f59e0b, #eab308, #f59e0b)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {/* MGA POGI */}
                    {'MGA POGI'.split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                        className="inline-block"
                        whileHover={{ y: -10, scale: 1.2 }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-neutral-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <motion.span
                className="inline-block"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Gupit Pogi
              </motion.span>
              {' \u2022 '}
              <motion.span
                className="inline-block"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Gupit Matapang
              </motion.span>
            </motion.p>

            {/* 3D Button */}
            <motion.button
              onClick={onBookClick}
              className="px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black uppercase tracking-widest relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: 2, duration: 0.8, type: 'spring' }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Now</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2.5 },
            y: { repeat: Infinity, duration: 1.5 },
          }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 relative overflow-hidden">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-amber-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
