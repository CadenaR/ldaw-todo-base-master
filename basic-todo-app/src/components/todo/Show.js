import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Show = () => {
  let { id } = useParams();

  const [task, setTask] = useState({
    id: "",
    description: "",
    status: "",
  });

  async function fetchTask() {
    const result = await axios(`http://localhost:3001/task/${id}`);
    setTask(result.data);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <>
      <h1>Show Task</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td style={{ color: "blue" }}>{task.id}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td style={{
                color: task.status === "pending" ? "red" : "green",
              }}>{task.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Show;
