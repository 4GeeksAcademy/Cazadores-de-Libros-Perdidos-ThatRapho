import React, { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [author, setAuthor] = useState(null);
  const [works, setWorks] = useState([]);

  const getAuthor = async () => {
    const res = await fetch(`https://openlibrary.org/search/authors.json?q=${inputValue}`);
    const data = await res.json();

    if (data.docs && data.docs.length > 0) {
      const authorKey = data.docs[0].key; // e.g., "OL123456A"
      setAuthor(authorKey);
      getWorks(authorKey);
    } else {
      setAuthor("No author found");
      setWorks([]);
    }
  };

  const getWorks = async (authorKey) => {
    const res = await fetch(`https://openlibrary.org/authors/${authorKey}/works.json`);
    const data = await res.json();
    setWorks(data.entries || []);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left-Search */}
        <div
          className="col-md-4 d-flex flex-column justify-content-center align-items-center"
				  style={{ gap: "1rem", borderRight: "1px solid #ccc", paddingLeft: "5rem", paddingRight: "5rem" }}
			  >
				  <div class="p-5 pb-0 pt-0 mb-4 rounded-3 mt-0">
					  <div class="container-fluid pb-5">
						  <h1 class="display-5 fw-bold"><img src="https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-book-icon-vector-image-png-image_6552370.png" alt="" srcset="" />Lost Book Hunters</h1>
						  <p class="col-md-8 fs-4">An Adventurous Dive into Literary Treasures using fetch</p>
					  </div>
				  </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter author name"
            className="form-control w-100"
          />
          <button className="btn btn-warning w-100" onClick={getAuthor}>
            Search
          </button>
        </div>

        {/* Right-Info */}
        <div
          className="col-md-8 d-flex flex-column p-4 bg-secondary overflow-auto"
          style={{ gap: "1rem" }}
        >
          {author && typeof author === "string" && author.startsWith("OL") && (
            <div><p><strong>Author key:</strong> {author}</p>
			<p><strong>{author.name}</strong></p>
			<p><i>insert quote</i></p></div>
          )}

				  {author === "No author found" && (
					  <div class="alert alert-danger" role="alert">
						  No author found.
					  </div>
				  )}

          {works.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {works.map((work, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    minHeight: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* Placeholder for future cover image */}
                  <div
                    style={{
                      height: "100px",
                      backgroundColor: "#e0e0e0",
                      marginBottom: "0.5rem",
                      borderRadius: "3px",
                    }}
                  ></div>
                  <div>{work.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
