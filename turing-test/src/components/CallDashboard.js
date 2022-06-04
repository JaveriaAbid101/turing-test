import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCalls } from '../api/callApi';

function CallDashboard() {
  const [callData, setCallData] = useState([]);
  const navigate = useNavigate();

  const getCalls = async () => {
    try {
      const res = await getAllCalls();
      console.log(res, 'success');
      setCallData(res.nodes);
    } catch (error) {
      console.log(error, 'Api error');
    }
  };

  useEffect(() => {
    getCalls();
  }, []);

  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">CALL TYPE</th>
            <th scope="col">DURATION</th>
            <th scope="col">TIME</th>
            <th scope="col">From</th>
            <th scope="col">ARCHIVED</th>
          </tr>
        </thead>
        <tbody>
          {callData.map((data, ind) => {
            return (
              <tr onClick={() => navigate(`/details/${data.id}`)}>
                <td>{ind}</td>
                <td>{data.call_type}</td>
                <td>{data.duration}</td>
                <td>{data.created_at}</td>
                <td>{data.from}</td>
                <td>{data.is_archived ? 'true' : 'false'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CallDashboard;
