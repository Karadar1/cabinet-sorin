import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample images - replace with your actual image paths
const galleryImages = [
  "https://picsum.photos/seed/1/800/600",
  "https://picsum.photos/seed/2/800/600",
  "https://picsum.photos/seed/3/800/600",
  "https://picsum.photos/seed/4/800/600",
  "https://picsum.photos/seed/5/800/600",
];

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (selectedImage + 1) % galleryImages.length;
    } else {
      newIndex =
        (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    }
    setSelectedImage(newIndex);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            onClick={() => openImage(index)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeImage}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={selectedImage}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -100 || velocity.x < -500) {
                    navigateImage("next");
                  } else if (swipe > 100 || velocity.x > 500) {
                    navigateImage("prev");
                  }
                }}
                className="relative max-w-[90%] max-h-[90%]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Button */}
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-[-50px] top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10 hidden md:block"
                >
                  &#10094;
                </button>

                {/* Next Button */}
                <button
                  onClick={() => navigateImage("next")}
                  className="absolute right-[-50px] top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10 hidden md:block"
                >
                  &#10095;
                </button>

                {/* Close Button */}
                <button
                  onClick={closeImage}
                  className="absolute top-[-40px] right-0 text-white text-4xl hover:text-gray-300 z-10"
                >
                  &times;
                </button>

                {/* Selected Image */}
                <img
                  src={galleryImages[selectedImage]}
                  alt={`Full size image ${selectedImage + 1}`}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
