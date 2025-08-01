import configPromise from '@payload-config'
import { getPayload } from 'payload'

import Footer from "./footer";
import Navbar from "./navbar";
import { SearchFilter } from "./search-filter";
import { Category } from '@/payload-types';
import { CustomCategory } from './type';

type props = {
    children : React.ReactNode;
}

const HomeLayout = async({children} :props) => {

    const payload = await getPayload({
          config: configPromise,
        })
    
         const data = await payload.find({
        collection: 'categories',
        depth: 1,// populate subcategories
        pagination: false,
        where: {
          parent: {
            exists: false,
          }
        },
        sort: 'name',
      })

      const formattedData:CustomCategory[] = data.docs.map((doc)=>(
        {
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) =>({
              //Becuase of 'deapth:1 ' we are confident doc will be a type of "category"  
              ...(doc as Category),
                subcategories: undefined,
            }))
        }
      ))

 return(
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <SearchFilter data={formattedData}/>
        <div className="flex-1 bg-[#f4f4f0]">
            {children}
        </div>
        <Footer/>
    </div>
 )
}

export default HomeLayout;