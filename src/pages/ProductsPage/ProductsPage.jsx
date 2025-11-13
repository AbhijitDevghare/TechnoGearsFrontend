import HomeLayout from "../../layout/HomeLayout"
import Products from "./Products"

function ProductsPage()
{
    return(
        <>
            <HomeLayout>
            <Products  filter={{}}  flexWrap={true} isButtonVisible={true   }/>
            </HomeLayout>
        </>
    )
}

export default ProductsPage