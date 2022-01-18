import { useEffect, useState } from "react";
import "./style.css";

const steps = ["Added", "In-Check", "approved", "Active", "Inactive"];

export default function Status(props: {
  initialStatus: number;
  onStatusClick: Function;
}) {
  const [status, setStatus] = useState(props.initialStatus);

  useEffect(() => {
    setStatus(props.initialStatus);
  }, [props.initialStatus]);

  return (
    <div className="box">
      <div className="steps">
        <ul className="nav">
          {steps.map((item, index) => (
            <li
              onClick={() => {
                props.onStatusClick(index);
              }}
              key={index}
              className={`${status === index ? "active" : ""}`}
            >
              <div>
                <span>{steps[index]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
