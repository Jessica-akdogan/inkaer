import React from "react";
import "../../styles/home/howItWorks.scss";
import Card from "../ui/Card";
import Button from "../ui/Button";

const HowItWorks: React.FC = () => {
  return (
    <div className="how-it-works">
      <h2 className="how-it-works__title">How It Works</h2>

      <div className="how-it-works__cards">
  <Card
    title="1. Set Questions"
    fullHeight={false}
    subtitle="Type your own or select from saved company templates — tailored per candidate or role."
  />
  <Card
    title="2. Candidate Records on Their Time"
    fullHeight={false}
    subtitle="They receive a link to record answers. Proctored. Timed. No do-overs."
  />
</div>

<Card
  title="3. AI Reviews & Summarizes"
  className="how-it-works__card how-it-works__card--wide"
  subtitle="We transcribe, score, and summarize each answer. You review reports or watch clips — no wasted time."
  fullHeight={false}
/>


      <div className="how-it-works__summary">
        <h3 className="how-it-works__summary-title">Designed for Hiring Managers Who Don’t Have Time</h3>
        <p className="how-it-works__summary-text">
          We’re not replacing you — we’re giving you time back. Skip the scheduling. Skip the repetitive screening. Start with answers, not appointments.
        </p>
        <Button>Try It Now</Button>
      </div>
    </div>
  );
};

export default HowItWorks;