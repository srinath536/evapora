import "../styles/Landing.css"
const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="headline">Evapora: Secure Your Files</h1>
        <p className="subtext">Geo-intelligent, self-destructing file storage solution.</p>
        <p className="description">
          Upload your files securely and set parameters like location, time limit, and authorization level.
        </p>
        <button className="cta-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Landing;
