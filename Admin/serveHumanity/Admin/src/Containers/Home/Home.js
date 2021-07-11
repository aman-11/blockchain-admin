import React from "react";

import img from '../../Images/admin.svg'
import { Link } from "react-router-dom";
function Home() {
  return (
    <header style={{marginTop:'120px'}}>
      <div className="smoothie">
        <img src={img} alt="" />
      </div>
      <div className="headings">
        <h2>Serve Humanity</h2>
        <h3>If you can't feed a hundred people, then feed just one.</h3>
        <Link to="/request" className="btn">Request for Donation</Link>
      </div>
    </header>
  );
}

export default Home;
