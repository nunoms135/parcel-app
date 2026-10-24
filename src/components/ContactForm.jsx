"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="notice" role="status">
        <h2>Message sent</h2>
        <p>Thanks for reaching out. We’ll reply within two business days.</p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        // Demo only: wire this to an API route or email service for real use.
        setSent(true);
      }}
    >
      <label>
        Name
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="btn btn-primary">
        Send message
      </button>
    </form>
  );
}
