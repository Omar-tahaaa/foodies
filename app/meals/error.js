"use client";
function Error({ error }) {
  return (
    <div className="error">
      <h1>An error occurred</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </div>
  );
}

export default Error;
