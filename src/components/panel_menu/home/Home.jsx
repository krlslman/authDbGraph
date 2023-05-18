import React from 'react'
import Image from "next/image"

const Home = () => {
  return (
    <section id="" className='home'>
      <div className="row">
        <div className="col-6 d-flex flex-column justify-content-start align-items-center">
            <h1 className="asd m-5">Information about this project</h1>
            <p className="asd fs-5 mx-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <button className="asd p-3 rounded-pill">Click here</button>
        </div>
        <div className="col-6">
              <div className="testStyling home-image m-5">Hover img | Direct Data</div>
              <div className="testStyling home-image m-5">Hover img | Direct Graph</div>
        </div>
      </div>
    </section>
  )
}
export default Home;