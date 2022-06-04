import { useState, useEffect } from 'react';
import { getCallDetail } from '../api/callApi';
import { useParams } from 'react-router-dom';

function CallDetails() {
  const [callData, setCallData] = useState([]);

  const { id } = useParams();

  const getCallsDetails = async () => {
    try {
      const res = await getCallDetail(id);
      console.log(res, 'success');
      setCallData(res);
    } catch (error) {
      console.log(error, 'Api error');
    }
  };

  useEffect(() => {
    getCallsDetails();
  }, []);

  return (
    <div className="container d-flex">
      <div style={{ width: '20%' }}>
        <p>Call Type</p>
        <p>Duration</p>
        <p>Time</p>
        <p>From</p>
        <p>To</p>
        <p>Via</p>
        <p>Archived</p>
      </div>

      <div>
        <p>{callData.call_type}</p>
        <p>{callData.duration}</p>
        <p>{callData.created_at}</p>
        <p>{callData.from}</p>
        <p>{callData.to}</p>
        <p>{callData.via}</p>
        <p>{callData.is_archived ? 'true' : 'false'}</p>
      </div>
    </div>
  );
}

export default CallDetails;
