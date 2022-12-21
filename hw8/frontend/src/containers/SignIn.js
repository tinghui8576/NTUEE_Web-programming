import AppTitle from "./components/Title"
import Log from "./components/Log"
import {useChat} from "./hooks/useChat"

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();

    const handleLogin = (name) =>{
        if(!name){
            console.log('no')
            
            displayStatus({
               type: "error",
                msg: "Missing user name",
           })
        }
        
       else{
        
            setSignedIn(true);
       }
    }
    return (
        <>
            <AppTitle />
            <Log me={me} setMe={setMe} LogIn={handleLogin} />
        </>
    )
}
export default SignIn