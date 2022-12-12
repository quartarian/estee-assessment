export async function getFoodTrucks() {
  const url = "https://data.sfgov.org/resource/rqzj-sfat.json";
  return await fetch(url)
    .then(res => res.json())
    .then((data)=>{
      return data;
    })
    .catch((error) => {
      alert("Oh no! There was an error fetching the food truck database from sfgov.org.");
    })
}
