import axios from 'axios';
const KEY = '34264605-ab9e7d425567024b4a0749b95';

 
export default async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
