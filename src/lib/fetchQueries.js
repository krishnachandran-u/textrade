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

export async function selectUserProducts(username) {
  try{
    const { data } = await axios.post(`/api/selectUserProducts`,{username});
    return data;
  }
  catch(error){
    console.log(error);
    return [];
  }
}

export async function selectUserProductsWithProfile(username) {
  try{
    const { data } = await axios.get(`/api/selectUserProfile?username=${username}`)
    return data;
  }
  catch(error){
    console.log(error);
    return [];
  }
}

export async function selectProduct(productId) {
  try{
    const { data } = await axios.get(`http://localhost:3000/api/selectProduct?productId=${productId}`)
    return data;
  }
  catch(error){
    console.log(error);
    return [];
  }
}

export async function selectUserInfo(username) {
  try{
    const { data } = await axios.post(`/api/selectUserInfo`,{username});
    console.log(data);
    return data;
  }
  catch(error){
    console.log(error);
    return [];
  }
}