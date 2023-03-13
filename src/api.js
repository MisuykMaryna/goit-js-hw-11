import axios from 'axios';
const KEY = '34264605-ab9e7d425567024b4a0749b95';

 
export async function fetchImages(searchQuery, page, perPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
