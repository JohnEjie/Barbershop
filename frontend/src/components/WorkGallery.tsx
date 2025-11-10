import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, ZoomIn } from 'lucide-react';

const gallery = [
  {
    url: '/images/gallery/kitz.jpg',
    alt: 'Barber tools',
  },
  {
    url: '/images/gallery/mark.jpg',
    alt: 'Barber tools',
  },
  {
    url: '/images/gallery/marlon.jpg',
    alt: 'Barber tools',
  },
  {
    url: '/images/gallery/pare.jpg',
    alt: 'Barber tools',
  },
  {
    url: '/images/gallery/panot.jpg',
    alt: 'Barber tools',
  },
  {
    url: '/images/gallery/rey.jpg',
    alt: 'Barber tools',
  },
];

export function WorkGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl mb-4 inline-block"
          >
            {'THE WORK'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ 
                  y: -10,
                  color: '#f59e0b',
                  textShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100%', maxWidth: 384, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className="aspect-square overflow-hidden relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(index)}
              whileHover={{ 
                scale: 1.05,
                zIndex: 10,
                rotate: hoveredIndex === index ? Math.random() * 4 - 2 : 0,
              }}
            >
              <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Border Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-amber-500"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Zoom Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                >
                  <ZoomIn className="w-8 h-8 text-black" />
                </motion.div>
              </motion.div>

              {/* Corner Accents */}
              {hoveredIndex === index && (
                <>
                  {[
                    { top: 0, left: 0, rotate: 0 },
                    { top: 0, right: 0, rotate: 90 },
                    { bottom: 0, right: 0, rotate: 180 },
                    { bottom: 0, left: 0, rotate: 270 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 border-t-2 border-l-2 border-amber-500"
                      style={{ ...pos, rotate: pos.rotate }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </>
              )}

              {/* Particle Effect on Hover */}
              {hoveredIndex === index && [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              className="max-w-5xl w-full"
              initial={{ scale: 0.5, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 90 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={gallery[selectedImage].url}
                alt={gallery[selectedImage].alt}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
