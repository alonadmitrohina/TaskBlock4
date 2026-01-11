import axios from 'axios';

export const songExists = async (songId: number): Promise<boolean> => {
    try {
        await axios.get(`http://localhost:8080/api/songs/${songId}`);
        return true;
    }
    catch {
        return false;
    }
}
