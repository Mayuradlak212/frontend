import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '0 auto',
      marginTop: '40px',
    }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '10px', color: '#333' }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 20px 0',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
        </label>
        <label style={{ marginBottom: '10px', color: '#333' }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 20px 0',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
        </label>
        <label style={{ marginBottom: '10px', color: '#333' }}>
          Mobile :
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 20px 0',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />
        </label>
        <label style={{ marginBottom: '10px', color: '#333' }}>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 20px 0',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '100px',
            }}
          />
        </label>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default ContactUs;
