import { useState, useEffect } from 'react';
import "./SpotifyPlayer.css";

function SpotifyPlayer() {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [track, setTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const token = localStorage.getItem('spotifyToken');

  useEffect(() => {
    if (!token)
      return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const premiumPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK Player',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      setPlayer(premiumPlayer);

      premiumPlayer.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
        setIsReady(true);
        transferPlayback(device_id);
        fetchCurrentSong();
      });

      premiumPlayer.addListener('player_state_changed', (state) => {
        if (!state)
            return;
        setIsPaused(state.paused);
        fetchCurrentSong();
      });
      premiumPlayer.connect();
    };

    if (!window.Spotify) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    }

    fetchPlaylists();
  }, [token]);

  const transferPlayback = async (deviceId) => {
    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: true,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${token}`
        },
      });

      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentSong = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${token}`
        },
      });

        const data = await response.json();
        if (data.item) {
          setTrack({
            name: data.item.name,
            artist: data.item.artists.map((artist) => artist.name).join(' | '),
            image: data.item.album.images[0].url,
          });
        }
    } catch (error) {
      console.error(error);
    }
  };

  const playPausePlay = async () => {
    try {
      await fetch(`https://api.spotify.com/v1/me/player/${isPaused ? 'play' : 'pause'}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      setIsPaused(!isPaused);
    } catch (error) {
      console.error(error);
    }
  };

  const skipTrack = async () => {
    try {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      fetchCurrentSong();
    } catch (error) {
      console.error(error);
    }
  };

  const previousTrack = async () => {
    try {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      fetchCurrentSong();
    } catch (error) {
      console.error(error);
    }
  };

  const playPlaylist = async (playlistUri) => {
    if (!deviceId)
      return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ context_uri: playlistUri }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="whole-page">
      <div className="your-spotify">
        <h1>Your Spotify</h1>
        {isReady ? (
          <div>
            <div className="all-playlists">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => playPlaylist(playlist.uri)}
                  className="one-playlist"
                >
                  {playlist.images.length > 0 && (
                    <img src={playlist.images[0].url} className="playlist-image" />
                  )}
                  <p>{playlist.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading Spotify...</p>
        )}
      </div>

      <div className="now-playing">
        <h3>Now Playing</h3>
        {track ? (
          <>
            <img src={track.image} className="album-image" />
            <p>{track.name}</p>
            <p>{track.artist}</p>
            <div className="playing-buttons">
              <button onClick={previousTrack}>Back</button>
              <button onClick={playPausePlay}> {isPaused ? "Play" : "Pause"}</button>
              <button onClick={skipTrack}>Next</button>
            </div>
          </>
        ) : (
          <p>Choose a Playlist!</p>
        )}
      </div>
    </div>
  );
}

export default SpotifyPlayer;
