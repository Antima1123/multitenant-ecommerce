import Footer from "./footer";
import Navbar from "./navbar";

type props = {
    children : React.ReactNode;
}

const HomeLayout = ({children} :props) => {
 return(
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-1 bg-[#f4f4f0]">
            {children}
        </div>
        <Footer/>
    </div>
 )
}

export default HomeLayout;