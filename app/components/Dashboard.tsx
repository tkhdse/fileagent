import getGroups from "@/libs/getGroups";
import Card from "../components/Card";

const Dashboard = async () => {

    const groups = await getGroups();

    return (
        <div>
            <div className="w-full grid grid-cols-4 gap-4 mt-5">
                {groups.map((entry, i) =>
                    <Card key={i} id={entry.id} name={entry.name} description={entry.description} num_collab={0}></Card>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;