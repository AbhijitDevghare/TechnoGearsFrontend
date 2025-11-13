import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import HorizontalProductCarousel from "../../components/carousel/HorizontalProductCarousel";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeLayout from "../../layout/HomeLayout";
import Products from "../ProductsPage/Products";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/slices/CartSlice";
import {  getUser,logout} from "../../redux/slices/AuthSlice";



function HomePage() {

  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

















































      
      console.log("Cart printing in the custom route", dispatch(getCart()));

      // Temporaray COMENTED
      // const response = await dispatch(getUser());

      // if(!(response.payload))
      // {
      //   dispatch(logout())
      //   navigate("auth/login")
        
      // }
      // console.log("GETUSER RESPONSE", response);
    };
  
    fetchData();
  }, [dispatch]);
  

  useEffect(()=>{
  },[])
  return (
    <HomeLayout>
      
      <br />
      <HeroSection/>
      <br />


      <HorizontalProductCarousel title={"💻 Best Laptops"}>
         <Products filter={{category:"Laptop" , "ratings.average": { $gte: 4 }}}  isButtonVisible={false}/>
      </HorizontalProductCarousel>

      <HorizontalProductCarousel title={"💻 Best TV's"}>
         <Products filter={{category:"TV" , "ratings.average": { $gte: 4 }}}  isButtonVisible={false}/>
      </HorizontalProductCarousel>

      <Carousel />

      <HorizontalProductCarousel title={"💻 Best Camera's"}>
      <Products filter={{ category: "Camera", "ratings.average": { $gte: 4 } }} isButtonVisible={false} />
      </HorizontalProductCarousel>

      <HorizontalProductCarousel title={"💻 Best Mobiles"}>
         <Products filter={{category:"Mobile" , "ratings.average": { $gte: 4 }}}  isButtonVisible={false}/>
      </HorizontalProductCarousel>

      <HorizontalProductCarousel title={"💻 Best Headphones"}>
         <Products filter={{category:"HeadPhones" , "ratings.average": { $gte: 4 }}}  isButtonVisible={false}/>
      </HorizontalProductCarousel>

      
      <div className="container mx-auto px-4 mt-10">

      </div>
    </HomeLayout>
  );
}

export default HomePage;
