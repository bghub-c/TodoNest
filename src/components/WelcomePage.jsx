import { useSelector } from "react-redux";

export default function WelcomePage() {
    const isDarkmode = useSelector(state => state.tasks.darkMode);
  return (
    <div className={`flex absolute z-50 items-center justify-center h-screen w-screen ${isDarkmode ? "bg-bg1 text-white" : ""}`}>
      <h1 className="text-4xl font-bold">Welcome to ToDo Nest!</h1>
    </div>
  );
}
