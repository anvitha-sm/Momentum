import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { getAllUsersAPI, addFriendAPI, removeFriendAPI } from "./api/api";
import "./dashboard.css";
import { NavigationBar } from "NavBar.jsx";

function Explore(){
    const [userQuery, setUserQuery] = useState("");
    const [user, setUser] = useState([]);
    const [userList, setUserList] = useState(new Set());
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const Navbar = NavigationBar();
    useEffect(() => {
        if(token){
            fetchData();
        }
    }, [token]);
    const getUsers = async () => {
        try{
            const i = await getAllUsersAPI();
            setUserList(i);
        } catch (error){
            console.error("Unable to get user data", error);
        }

    }
    const searchUserFilter = userList.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const addUsers = async() =>{
        try{
            await addFriendAPI(
                {
                    friendId: user,
                },
                token
            );
            console.log("You have a new friend: ", user);
            navigate("/dashboard");
        } catch (error){
            console.error("Friend could not be added: ", error);
        }
    }
    const removeFriend = async() =>{
        try{
            await removeFriendAPI(
                {
                    friendId: user,
                },
                token,
            );
        } catch(error) {
            console.error("Failed to remove friend: ", error);
        }
    }
    
    const viewUserProfile = (userId) => {
        navigate(`/user/${userId}`);
    }
    
    return (
        <Navbar>
        <div className="dashboard explore-page">
            <input type="text" className="search-input" placeholder="Search by user or username" value={searchQuery}
            onChange={(i) => setUserQuery(i.target.value)}/> 
            <div className="dashboard-flex users">
                {searchUserFilter.map((user) =>
                  <div className="userDisplay">
                    <p className="user-name"> {user.username}</p>
                    <div className="user-action-buttons">
                      <button className="add-button" onClick={() => addUsers(user)}> Add Friend </button>
                      <button className="remove-button" onClick={() => removeFriend(user)}> Remove Friend </button>
                      <button className="view-profile-button" onClick={() => viewUserProfile(user._id)}> View Profile </button>
                    </div>
                  </div>
                )}
            </div>
        </div>
        </Navbar>
    )
}

export default findOtherUsers;

