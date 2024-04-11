import React, { useState } from 'react';

const SchoolCalendarDashboard = () => {
  const [eventData, setEventData] = useState({
    date: '',
    'event-name': '',
    time: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Event Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          id="event-date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
          placeholder="Date"
          required
        />

        <input
          type="text"
          id="event-name"
          name="event-name"
          value={eventData['event-name']}
          onChange={handleInputChange}
          placeholder="Event Name"
          required
        />

        <input
          type="time"
          id="event-time"
          name="time"
          value={eventData.time}
          onChange={handleInputChange}
          placeholder="Time"
          required
        />

        <input
          type="text"
          id="event-location"
          name="location"
          value={eventData.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SchoolCalendarDashboard;
