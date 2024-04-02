import { useEffect, useState } from "react";

import "./Activity.css";

const Profile = () => {
  const [activeWindows, setActiveWindows] = useState([]);
  const electron = window.electron;
  useEffect(() => {
    const fetchData = async () => {
      const data = await electron.activeWindow();
      setActiveWindows((prev) => {
        if (
          data &&
          data.activeWindow !== undefined &&
          prev.length > 0 &&
          prev[prev.length - 1].activeWindow === data.activeWindow
        ) {
          return prev;
        } else {
          return [...prev, data];
        }
      });
    };
    setInterval(async () => {
      await fetchData();
    }, 2000);
  }, [activeWindows, electron]);

  return (
    <>
      <div className="table-container">
        <h2>Active Windows</h2>
        <table>
          <thead>
            <tr>
              <th>Active Window</th>
              <th>Process Name</th>
              <th>Time Start</th>
            </tr>
          </thead>
          <tbody>
            {activeWindows.map((window, index) => (
              <tr key={index}>
                <td>{window.activeWindow}</td>
                <td>{window.processName}</td>
                <td>{window.timeStart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
