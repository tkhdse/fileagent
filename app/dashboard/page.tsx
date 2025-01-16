import Dashboard from "../components/Dashboard";
import AddModal from "../components/modal/AddModal";

export default function DashboardPage() {

  return (
    <>
      <div className="flex-col w-[85%] ml-[7.5%] mt-[150px]">
        <div className="flex justify-between items-center pb-2 border-b-[1px] border-b-black">
          <span className="text-black text-2xl">Your Groups</span>
          <AddModal />
        </div>
        <Dashboard />
      </div>  
    </>
  );
}