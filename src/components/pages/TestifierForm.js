import React, { useState } from 'react';

function TestifierForm() {
  const [testifierData, setTestifierData] = useState({
    id: '',
    image: '',
    alt: '',
    name: '',
    rating: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestifierData({ ...testifierData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTestifierData({
      id: '',
      image: '',
      alt: '',
      name: '',
      rating: '',
      description: '',
    });
  };

  return (
    <div>
      <h1>Testifier Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="testifier-id"
          name="id"
          value={testifierData.id}
          onChange={handleInputChange}
          placeholder="ID"
          required
        />

        <input
          type="text"
          id="testifier-image"
          name="image"
          value={testifierData.image}
          onChange={handleInputChange}
          placeholder="Image Url"
          required
        />

        <input
          type="text"
          id="testifier-alt"
          name="alt"
          value={testifierData.alt}
          onChange={handleInputChange}
          placeholder="Alt Text"
          required
        />

        <input
          type="text"
          id="testifier-name"
          name="name"
          value={testifierData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />

        <input
          type="number"
          id="testifier-rating"
          name="rating"
          value={testifierData.rating}
          onChange={handleInputChange}
          placeholder="Rating"
          required
        />

        <textarea
          id="testifier-description"
          name="description"
          value={testifierData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TestifierForm;
