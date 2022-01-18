import { useState, useEffect } from "react";
import Status from "../../component/Status";

const headData = ["ID", "First Name", "Last Name", "State"];

interface EmployeeProps {
  firstName: string;
  lastName: string;
  id: number;
  state: number;
}

interface EmployeeListProps {
  employeeList: EmployeeProps[];
  onListUpdate: Function;
}

const TableHead = () => (
  <thead>
    <tr>
      {headData.map((item) => (
        <th>{item}</th>
      ))}
    </tr>
  </thead>
);

const TableData = ({ employeeList, onListUpdate }: EmployeeListProps) => (
  <>
    {employeeList &&
      employeeList?.map((item, index) => {
        const { firstName, lastName, id, state } = item;
        return (
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>
                <Status
                  onStatusClick={(newState: number) => {
                    employeeList[index].state = newState;
                    onListUpdate(employeeList);
                  }}
                  initialStatus={state}
                />
              </td>
            </tr>
          </tbody>
        );
      })}
  </>
);

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState<EmployeeProps[]>([]);

  useEffect(() => {
    const employeeData = window.sessionStorage.getItem("employeeData");
    if (!employeeData) {
      fetch("https://61e6b7dace3a2d001735939b.mockapi.io/api/v1/employee")
        .then((response) => response.json())
        .then((data) => {
          setEmployeeList(data.response);
        });
    } else {
      setEmployeeList(JSON.parse(employeeData ? employeeData : ""));
    }
  }, []);

  useEffect(() => {
    if (employeeList) {
      window.sessionStorage.setItem(
        "employeeData",
        JSON.stringify(employeeList)
      );
    }
  }, [employeeList]);

  return (
    <div>
      <table>
        <TableHead />
        <TableData
          employeeList={employeeList}
          onListUpdate={(newEmployeeList: EmployeeProps[]) => {
            setEmployeeList([...newEmployeeList]);
          }}
        />
      </table>
    </div>
  );
}
