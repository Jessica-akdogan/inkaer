import React from "react";
import "../../styles/home/pricing.scss";
import Button from "../ui/Button";
import Card from "../ui/Card";

const Pricing: React.FC = () => {
  return (
    <div className="pricing">
      <div className="pricing__intro">
        <h2 className="pricing__title">Simple Pricing That Scales With You</h2>
        <p className="pricing__description">
          Monthly or annual plans to fit any team size. No per-candidate stress.
          Just async, AI-powered interviews at scale.
        </p>
      </div>

      <div className="pricing__cards">
        <Card
          title="Starter"
           titleAlign="center"
          className="pricing__card"
          subtitle="For small teams just getting started"
        >
          <div className="pricing__price">
            $99/mo <span className="pricing__price-note">or $990/year</span>
          </div>
          <ul className="pricing__features">
            <li className="pricing__feature">✅ 25 candidates/month</li>
            <li className="pricing__feature">✅ 1 hiring seat</li>
            <li className="pricing__feature">✅ AI video review</li>
            <li className="pricing__feature">✅ Anti-cheat proctoring</li>
            <li className="pricing__feature  pricing__feature--unavailable">
              ❌ ATS integration
            </li>
            <li className="pricing__feature  pricing__feature--unavailable">
              ❌ Branded experience
            </li>
          </ul>
          <Button>Get Started</Button>
        </Card>

        <Card
          title="Growth"
           titleAlign="center"
          className="pricing__card"
          subtitle="Best for growing hiring teams"
        >
          <div className="pricing__price">
            $250/mo <span className="pricing__price-note">or $2,500/year</span>
          </div>
          <ul className="pricing__features">
            <li className="pricing__feature">✅ Unlimited interviews</li>
            <li className="pricing__feature">✅ Up to 5 hiring seats</li>
            <li className="pricing__feature">✅ Branded candidate flow</li>
            <li className="pricing__feature">✅ AI & proctoring</li>
            <li className="pricing__feature">✅ Priority support</li>
            <li className="pricing__feature  pricing__feature--unavailable">
              ❌ Full ATS integration
            </li>
          </ul>
          <Button>Start Free Trial</Button>
        </Card>

        <Card
          title="Enterprise"
           titleAlign="center"
          className="pricing__card"
          subtitle="For large orgs & high-volume hiring"
        >
          <div className="pricing__price">Custom</div>
          <div className="pricing__price-note">Starts at $10,000/year</div>
          <ul className="pricing__features">
            <li className="pricing__feature">✅ Unlimited interviews</li>
            <li className="pricing__feature">✅ Unlimited roles & seats</li>
            <li className="pricing__feature">✅ ATS integrations + SSO</li>
            <li className="pricing__feature">✅ SLA & CSM</li>
            <li className="pricing__feature">✅ Advanced analytics</li>
          </ul>
          <Button>Talk to Sales</Button>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
