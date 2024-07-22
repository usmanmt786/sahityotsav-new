import Loader from "@/components/widgets/Loader";
import SaveToken from "./SaveToken";


const Login = ({params,searchParams}:{params:any, searchParams:any}) => {
    return (
        <div>
            <SaveToken redir={searchParams?.next} token={searchParams?.code} />
            <main className="h-[100svh] fullcenter">
                <Loader className=" text-gray-400"/>
                <h5 className="my-4">Authenticating...</h5>
            </main>
        </div>
    );
}

export default Login;
