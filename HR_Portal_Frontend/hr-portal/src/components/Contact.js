import React from 'react';
import './Contact.css';

function Contact() {
    return (
        <div className="contact-page">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, feel free to reach out to us:</p>

            {/* Gmail Input Form */}
            <div className="email-form">
                <label htmlFor="email">Send us an email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Gmail address"
                />
                <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows="4"
                ></textarea>
                <button type="submit">Submit</button>
            </div>

            {/* Team Members Section */}
            <div className="team-section">
                <h3>Meet Our Team</h3>
                <ul>
                    <li>
                        <strong>Revanth:</strong> Senior Developer passionate about building scalable solutions.
                    </li>
                    <li>
                        <strong>Sruthi:</strong> HR Manager with a knack for fostering positive work environments.
                    </li>
                    <li>
                        <strong>Chandini:</strong> Data Scientist specializing in analytics and machine learning.
                    </li>
                    <li>
                        <strong>Akshara:</strong> UI/UX Designer focused on creating seamless user experiences.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;
