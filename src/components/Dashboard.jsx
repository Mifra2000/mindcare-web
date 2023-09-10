import Table from "./Dashboard/Table";
import LineGraph from "./Dashboard/MonthlyGraph";
import BarGraph from "./BarGraph";
import Sidebar from "./Sidebar";
import PieGraph from "./PieGraph";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "./Dashboard/DashboardNavbar";

import DashboardBody from "./Dashboard/DashboardBody";

export default function Simple() {
  const location = useLocation();
  const therapist = location.state ? location.state.therapist : null;

  //console.log('Therapist Data:', therapist);
  return (
    <>
      <DashboardNavbar therapist={therapist} />
      <DashboardBody />
    </>
  );
}
