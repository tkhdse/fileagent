import Card from "../components/Card";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";



export default function Dashboard() {

  // user

  // get_networks
  const networks = ["TG", "MP", "joe mama", "UIUC", "JHVRD"];

  return (
    <>
      {/* <Navbar profile={img}/> */}
      <div className="flex-col w-[85%] ml-[7.5%] mt-[150px]">
        <span className="text-black text-2xl">Your Networks</span>
        <div className="w-full grid grid-cols-4 gap-4 mt-5">
            {
              networks.map((entry, i) =>
                 <Card key={i} name={entry} description={"temp description " + i} num_collab={0}></Card>
              )
            }


        </div>
      </div>  
    </>
  );
}


// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const supabase = createPagesServerClient(ctx);
//   const {
//     data: { user }, 
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: { user }
//   };
// }