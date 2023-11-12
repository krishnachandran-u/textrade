import axios from "axios";

export async function searchProducts(searchQuery) {
  try{
    const { data } = await axios.get(`/api/selectAllProduct?search=${searchQuery}&take=10&skip=0`);
    return data;
  }
  catch(error){
    console.log(error);
    return [];
  }
}