import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const noOfPages = Math.ceil(employees.length / 10);
  const [pageNumber, setPageNumber] = useState(1);
  const [employeesToRender, setEmployeesToRender] = useState([]);

  useEffect(() => {
    axios(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => setEmployees(res.data))
      .then(() => setIsMounted(true))
      .catch((e) => alert("failed to fetch data"));
  }, []);
  useEffect(() => {
    const start = (pageNumber - 1) * 10;

    const end =
      (pageNumber - 1) * 10 + 10 < employees.length
        ? (pageNumber - 1) * 10 + 10
        : employees.length;
    setEmployeesToRender(employees.slice(start, end));
  }, [isMounted, pageNumber]);
  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table className="employeeTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employeesToRender.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Previous
        </button>
        <p>{pageNumber}</p>
        <button
          onClick={() => {
            if (pageNumber < noOfPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
