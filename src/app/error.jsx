"use client";

export default function ErrorPage({ reset }) {
  return (
    <section className="contact">
      <h1>Couldn’t load products</h1>
      <p className="lead">
        The product service didn’t respond. Check your connection and try again.
      </p>
      <button type="button" className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
