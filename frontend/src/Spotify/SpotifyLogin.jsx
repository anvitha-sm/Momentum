import React from 'react';
import "./SpotifyLogin.css";
const CLIENT_ID = '376f613bea1344dd97e9b8db385ff7dc';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state'
];

function SpotifyLogin() {
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;
    window.location.href = authUrl;
  };
  return <button onClick={handleLogin} className="spotify-login-button">Play Spotify</button>;
}

export default SpotifyLogin;
