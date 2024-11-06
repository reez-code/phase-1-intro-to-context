// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arr) {
  let empty = [];
  for (let i = 0; i < arr.length; i++) {
    empty.push(createEmployeeRecord(arr[i]));
  }
  return empty;
}

function createTimeInEvent(employee, dateTime) {
  const split = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date: split[0],
    hour: Number(split[1]),
  });
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const split = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: split[0],
    hour: Number(split[1]),
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  for (let key of employee.timeOutEvents) {
    if (key.date === date) {
      const hour = key.hour;
      for (let key of employee.timeInEvents) {
        if (key.date === date) {
          return (hour - key.hour) / 100;
        }
      }
    }
  }
}

function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  let total = 0;

  for (let key of employee.timeInEvents) {
    total += hoursWorkedOnDate(employee, key.date);
  }
  return total * employee.payPerHour;
}

function calculatePayroll(employees) {
  let payroll = 0;
  for (let employee of employees) {
    payroll += allWagesFor(employee);
  }
  return payroll;
}
