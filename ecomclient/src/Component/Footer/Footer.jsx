
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="ecom-footer">

      <div className="footer-top">

        <div className="footer-column footer-about">
          <h2 className="footer-logo">
        Ecom<span>APP.</span>
          </h2>

          <p>
            Your one-stop destination for quality products.
            Discover the best deals, latest collections
            and amazing shopping experiences.
          </p>

          <div className="footer-social">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/offers">Latest Offers</a>
        </div>

        <div className="footer-column">
          <h3>Customer Service</h3>
          <a href="/account">My Account</a>
          <a href="/orders">Track Order</a>
          <a href="/returns">Returns & Refunds</a>
          <a href="/shipping">Shipping Information</a>
          <a href="/faq">FAQs</a>
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact Information</h3>

          <p>📍 Chennai, Tamil Nadu, India</p>
          <p>📧 support@shopzone.com</p>
          <p>📞 +91 98765 43210</p>

          <h3 className="newsletter-title">
            Subscribe to Newsletter
          </h3>

          <form className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-middle">

        <div>
          <h4>We Accept</h4>
          <p>Visa | Mastercard | UPI | RuPay | PayPal</p>
        </div>

        <div>
          <h4>Shopping Benefits</h4>
          <p>Free Shipping | Secure Payment | Easy Returns</p>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 ECOM. All Rights Reserved.
        </p>

        <div className="footer-policy">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/cookies">Cookie Policy</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
