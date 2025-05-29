import React from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "subscribers"), {
        name,
        email,
        subscribedAt: Timestamp.now(),
      });

      // Call backend to send thank-you email
      await fetch(`${import.meta.env.VITE_PORT}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      setSubmitted(true);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error subscribing or sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Subscribe to Our Newsletter
      </h2>
      {submitted ? (
        <div className="text-green-600 font-medium text-center">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl transition text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>
      )}
    </>
  );
};

export default Newsletter;
