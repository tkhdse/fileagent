import Card from "../components/Card";
import { createServerSupabaseClient } from "../libs/server";
import { Group } from "@/types/types";


const Dashboard = async () => {
    const supabase = createServerSupabaseClient();
    const {data: {user}, error: auth_error } = await supabase.auth.getUser();
    if (!user || auth_error) {
        console.log("Error fetching user: ", auth_error?.message);
        return <></>
    }
    

    
    const {data, error: query_error} = await supabase
        .from('groups')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', {ascending: false})
    
    if (query_error) {
        console.log(query_error.message)
    }
    
    const groups = (data as Group[]) || []


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