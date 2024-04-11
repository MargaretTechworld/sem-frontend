import React, { useState } from 'react';

function NewsForm() {
  const [newsHeading, setNewsHeading] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [newsInfo, setNewsInfo] = useState('');
  const [newsImage, setNewsImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewsHeading('');
    setNewsDate('');
    setNewsInfo('');
    setNewsImage('');
  };

  return (
    <div>
      <h1>News Submission Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="news-heading"
          value={newsHeading}
          onChange={(e) => setNewsHeading(e.target.value)}
          placeholder="News Heading"
          required
        />

        <input
          type="date"
          id="news-date"
          value={newsDate}
          onChange={(e) => setNewsDate(e.target.value)}
          placeholder="News Date"
          required
        />

        <textarea
          id="news-info"
          rows="4"
          value={newsInfo}
          onChange={(e) => setNewsInfo(e.target.value)}
          required
          placeholder="News Info"
        />

        <input
          type="text"
          id="news-image"
          value={newsImage}
          onChange={(e) => setNewsImage(e.target.value)}
          placeholder="News Image"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewsForm;
