// import React, { useState } from 'react';
// import Intro from './Intro';
// import '../styles/newsEvents.css';
// import data from '../data/index.json';
// import SchoolCalendar from './SchoolCalendar';

// const NewsEvents = () => {
//   const [expandedItemId, setExpandedItemId] = useState(null);

//   const handleReadMore = (itemId) => {
//     setExpandedItemId(expandedItemId === itemId ? null : itemId);
//   };

//   return (
//     <div className="news-event-section">
//       <Intro heading="NEWS & EVENTS" />
//       {data?.News?.map((item) => (
//         <>
//           <div key={item.id} className="news-event-content">
//             <div className="news-event-sub-content">
//               <div className="news-event-image">
//                 <img src={item["news-image"]} alt={item["news-heading"]} />
//               </div>
//               <div className="news-event-text">
//                 <h3>{item["news-heading"]}</h3>
//                 <p>
//                   {expandedItemId === item.id
//                     ? (item["news-info"] || 'Content not available')
//                     : `${(item["news-info"] || '').substring(0, 200)}${(item["news-info"] && item["news-info"].length > 200) ? '...' : ''}`}
//                 </p>
//                 {expandedItemId !== item.id && (
//                 <button
//                   type="button"
//                   className="read-more-btn"
//                   onClick={() => handleReadMore(item.id)}
//                 >
//                   Read More
//                 </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ))}
//       <div className="calender-event">
//         <SchoolCalendar />
//       </div>
//     </div>
//   );
// };

// export default NewsEvents;

const NewsEvents = () => (
  <div>
    <p>Coming Soon</p>
  </div>
);
export default NewsEvents;
