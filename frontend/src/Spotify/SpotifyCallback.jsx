import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    let token = params.get('access_token');

    if (token) {
      localStorage.setItem('spotifyToken', token);
      navigate('/spotify-player');
    } else {
        token = localStorage.getItem('spotifyToken');
        if (!token) {
            navigate('/dashboard');
        } else {
            navigate('/spotify-player');
        }
    }
  }, [navigate]);
  return <p>Loading Spotify...</p>;
}

export default SpotifyCallback;
