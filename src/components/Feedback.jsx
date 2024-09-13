import React, { useState, useEffect } from 'react';

const feedbacks = [
  { name: 'John Doe', feedback: 'This is an amazing platform! It has greatly improved my learning experience.' },
  { name: 'Jane Smith', feedback: 'I love the user-friendly interface and the variety of courses available.' },
  { name: 'Alice Johnson', feedback: 'The support team is very responsive and helpful. Highly recommend!' },
  { name: 'Bob Brown', feedback: 'Great value for money. The course content is top-notch and well-organized.' },
  { name: 'Michael Green', feedback: 'Excellent customer service and well-structured courses.' },
  { name: 'Emily White', feedback: 'I’ve learned so much in such a short time. Thank you!' },
  // Add more feedbacks as needed
  { name: 'John Doe', feedback: 'This is an amazing platform! It has greatly improved my learning experience.' },
  { name: 'Jane Smith', feedback: 'I love the user-friendly interface and the variety of courses available.' },
  { name: 'Alice Johnson', feedback: 'The support team is very responsive and helpful. Highly recommend!' },
  { name: 'Bob Brown', feedback: 'Great value for money. The course content is top-notch and well-organized.' },
  { name: 'Michael Green', feedback: 'Excellent customer service and well-structured courses.' },
  { name: 'Emily White', feedback: 'I’ve learned so much in such a short time. Thank you!' },
  // Add more feedbacks as needed
];

function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(feedbacks.length / itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  const getCurrentItems = () => {
    const start = currentIndex * itemsPerSlide;
    return feedbacks.slice(start, start + itemsPerSlide);
  };

  return (
    <section style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
      margin: '0 auto',
      marginTop: '40px',
    }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>User Feedback</h2>
      <div style={{
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
          width: `${totalSlides * 100}%`,
        }}>
          {getCurrentItems().map((feedback, index) => (
            <div key={index} style={{
              flex: `0 0 ${100 / itemsPerSlide}%`,
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              margin: '0 10px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#333' }}>
                "{feedback.feedback}"
              </p>
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#007bff' }}>
                - {feedback.name}
              </p>
            </div>
          ))}
        </div>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <span key={index} style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              margin: '0 5px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#007bff' : '#ddd',
              transition: 'background-color 0.3s',
            }}></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeedbackCarousel;
