import axios from 'axios';

// Define the interface for the response data
interface NewGameResponse {
  gameid: number;
}

async function fetchNewGame(): Promise<NewGameResponse> {
  const NEW_API_GAME_URL = 'http://localhost:5000/create-new-game';
  try {
    const response = await axios.post<NewGameResponse>(NEW_API_GAME_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } 
}
  
export default fetchNewGame;