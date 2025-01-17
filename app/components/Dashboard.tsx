'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Card from "../components/Card";
import { Group } from "@/types/types";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";


const Dashboard = () => {
    const supabase = createClientComponentClient();
    const {user, isLoading} = useUser();
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {

        const fetchGroups = async () => {
            if (user) {
                const {data, error: query_error} = await supabase
                    .from('groups')
                    .select('*')
                    .eq('created_by', user.id)
                    .order('created_at', {ascending: false})
                
                if (query_error) {
                    console.log(query_error.message)
                }
                
                setGroups((data as Group[]) || [])
            }
        }

        fetchGroups();
    }, [supabase, user]);

    if (isLoading) return <></>

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