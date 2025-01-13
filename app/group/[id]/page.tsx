// import { GetServerSidePropsContext } from "next";
// import { ParsedUrlQuery } from 'querystring';
// import { supabase } from "@/libs/supabaseClient";
// import { Group } from "@/types/types";


// interface Params extends ParsedUrlQuery {
//     network_id: string; // Define your expected parameter
//   }


export default function GroupPage() {

  return (
    <>
      {/* <Navbar profile={img}/> */}
      <div className="flex-col w-[85%] ml-[7.5%] mt-[150px]">
        <span className="text-black text-2xl">group.name</span>
        <div className="w-full grid grid-cols-4 gap-4 mt-5">

        </div>
      </div>  
    </>
  );
}


// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//     const { group_id }  = ctx.params as Params
//     // const supabase = createMiddlewareClient({req : ctx.req})
//     const  {
//         data: { session }
//     } = await supabase.auth.getSession();

//     if (!session) {
//         return {
//             redirect: {
//               destination: '/login',
//               permanent: false,
//             },
//         };
//     }

//     const userId = session.user.id;
//     const { data: isMember } = await supabase
//         .from('group_members')
//         .select('*')
//         .eq('user_id', userId)
//         .eq('group_id', group_id)
//         .single();

//     if (!isMember) {
//         return {
//             redirect: {
//               destination: '/dashboard', // change to unauthorized access
//               permanent: false,
//             },
//         };
//     }

//     // Fetch community details
//     const { data: group, error } = await supabase
//         .from('network')
//         .select('*')
//         .eq('id', group_id)
//         .single();

//     if (error || !group) {
//         return {
//         notFound: true,
//         };
//     }

//     return {
//         props: { group },
//     };
// }