import "../../styles/home/banner.scss";
import Button from "../ui/Button";

const Banner = () => {
  return (
    <div className="hero">
      <h1 className="hero__title">
        Skip the First Interview. Let AI Assist, Not Decide.
      </h1>
      <p className="hero__description">
        Our AI assistant reviews proctored, time-limited candidate videos,
        transcribes every answer, and gives you a structured report. You make
        the final call — with all the context.
      </p>

      <div className="hero__features">
        <span>✅ No more scheduling back-and-forth</span>
        <span>✅ Proctored video interviews with strict timers</span>
        <span>
          ✅ AI analyzes and scores every response — but never makes the
          decision
        </span>
        <span>
          ✅ You get transcripts, summary reports, and full interview recordings
        </span>
      </div>
      <div className="cta">
        <Button>Try the AI Assistant for Free</Button>
      </div>
    </div>
  );
};

export default Banner;
