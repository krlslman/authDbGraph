/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Home = () => {
  return (
    <section id="" >
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl m-5">Information about this project</h1>
            <p className="text-xl mx-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <button className="my-5 mx-auto btn">Click here</button>
        </div>
        <div className="w-1/2 mt-4">
              <div className="testStyling homeImage m-5" style={{ overflow: "hidden" }}>
                <img src="https://img.freepik.com/free-vector/illustration-graphs_53876-28520.jpg" alt=""  style={{ objectFit: "cover"}} width="100%"/>
              </div>
              <div className="testStyling homeImage m-5" style={{ overflow: "hidden" }}>
                <img src="https://img.freepik.com/free-vector/illustration-graphs_53876-28520.jpg" alt=""  style={{ objectFit: "cover"}} width="100%"/>
              </div>
              {/* <div className="testStyling homeImage m-5">Hover img | Direct Graph</div> */}
              {/* <div className={[styles.testStyling, styles.homeImage ]}>Hover img | Direct Graph</div> */}
        </div>
      </div>
    </section>
  )
}
export default Home;