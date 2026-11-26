/*
Exercise 1: Image Gallery with Keyboard Navigation
Task: Build an image gallery that responds to keyboard events
Requirements:
  - Display array of images
  - Use arrow keys to navigate
  - Space bar to toggle fullscreen
  - Escape to close fullscreen
  - Click to select image
*/
import { useState } from 'react';

// Small generated SVG pictures so the exercise works without any image files
const makeImage = (label, color) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${color}"/><text x="200" y="165" font-size="40" text-anchor="middle" fill="white" font-family="Arial">${label}</text></svg>`
  );

const images = [
  { id: 1, title: 'Image 1', src: makeImage('Image 1', '#e74c3c') },
  { id: 2, title: 'Image 2', src: makeImage('Image 2', '#3498db') },
  { id: 3, title: 'Image 3', src: makeImage('Image 3', '#2ecc71') },
  { id: 4, title: 'Image 4', src: makeImage('Image 4', '#f39c12') },
  { id: 5, title: 'Image 5', src: makeImage('Image 5', '#9b59b6') },
];

function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setSelectedIndex(prev => (prev + 1) % images.length);
    } else if (e.key === 'ArrowLeft') {
      setSelectedIndex(prev => (prev - 1 + images.length) % images.length);
    } else if (e.key === ' ') {
      e.preventDefault(); // stop the page from scrolling
      setIsFullscreen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsFullscreen(false);
    }
  };

  const selected = images[selectedIndex];

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: 'none' }} autoFocus>
      <h2>Image Gallery</h2>
      <p>Click the gallery, then use Left/Right arrows to navigate, Space for fullscreen, Escape to close.</p>

      <img src={selected.src} alt={selected.title} style={{ width: 400, border: '3px solid #333' }} />
      <p>{selected.title} ({selectedIndex + 1} of {images.length})</p>

      <div style={{ display: 'flex', gap: 8 }}>
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.title}
            onClick={() => setSelectedIndex(index)}
            style={{
              width: 80,
              cursor: 'pointer',
              border: index === selectedIndex ? '3px solid blue' : '3px solid transparent',
            }}
          />
        ))}
      </div>

      {isFullscreen && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column', color: 'white', zIndex: 10,
          }}
        >
          <img src={selected.src} alt={selected.title} style={{ maxWidth: '80%', maxHeight: '80%' }} />
          <p>{selected.title} (press Escape or Space to close)</p>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
