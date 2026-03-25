import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Star, Flame, Crown } from 'lucide-react';

const Leaderboard = () => {
    const { user } = useAuth();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking the leaderboard data to make it look attractive immediately
        const mockLeaders = [
            { id: 1, name: "Alex Johnson", points: 1250, role: "Student", avatar: "https://i.pravatar.cc/150?u=12" },
            { id: 2, name: "Maria Garcia", points: 1100, role: "Student", avatar: "https://i.pravatar.cc/150?u=22" },
            { id: 3, name: "James Smith", points: 950, role: "Student", avatar: "https://i.pravatar.cc/150?u=33" },
            { id: 4, name: "Linda Williams", points: 890, role: "Student", avatar: "https://i.pravatar.cc/150?u=44" },
            { id: 5, name: "Michael Brown", points: 850, role: "Student", avatar: "https://i.pravatar.cc/150?u=55" },
            { id: 6, name: "Sarah Davis", points: 820, role: "Student", avatar: "https://i.pravatar.cc/150?u=66" },
            { id: 7, name: "User (You)", points: user?.points || 750, role: "Student", avatar: user?.profilePhoto || "https://i.pravatar.cc/150?u=a042581f4e29026024d", isCurrentUser: true }
        ].sort((a, b) => b.points - a.points);
        
        // Timeout to simulate loading
        setTimeout(() => {
            setLeaders(mockLeaders);
            setLoading(false);
        }, 600);
    }, [user]);

    const getRankColor = (index) => {
        switch (index) {
            case 0: return "#FFD700"; // Gold
            case 1: return "#C0C0C0"; // Silver
            case 2: return "#CD7F32"; // Bronze
            default: return "#4318FF";
        }
    };

    return (
        <div className="dashboard-content">
            <Navbar name={user?.name || "Student"} avatarUrl={user?.profilePhoto || "https://i.pravatar.cc/150?u=a042581f4e29026024d"} />
            
            <div className="welcome-banner" style={{ background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)", borderRadius: "20px", padding: "2rem", color: "#1B254B" }}>
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                        <Trophy size={32} color="#FFD700" /> Global Leaderboard
                    </h1>
                    <p style={{ marginTop: '10px', fontWeight: '500' }}>Compete, participate, and climb the ranks to earn exclusive rewards.</p>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Flame className="spinner" size={40} color="#4318FF" style={{ animation: "spin 2s linear infinite" }} />
                    <p>Loading the champions...</p>
                </div>
            ) : (
                <div className="leaderboard-container">
                    {/* Podium Section */}
                    <div className="podium" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', margin: '3rem 0', minHeight: '250px' }}>
                        {/* 2nd Place */}
                        {leaders[1] && (
                            <div className="podium-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={leaders[1].avatar} alt={leaders[1].name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #C0C0C0' }} />
                                    <Medal size={28} color="#C0C0C0" style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'white', borderRadius: '50%' }} />
                                </div>
                                <h3 style={{ margin: '10px 0 5px' }}>{leaders[1].name}</h3>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#C0C0C0' }}>{leaders[1].points} pts</p>
                                <div style={{ height: '120px', width: '100px', background: 'linear-gradient(180deg, #E0E0E0 0%, #F5F5F5 100%)', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', color: 'white', fontWeight: 'bold', marginTop: '15px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)' }}>2</div>
                            </div>
                        )}

                        {/* 1st Place */}
                        {leaders[0] && (
                            <div className="podium-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <Crown size={32} color="#FFD700" style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)' }} />
                                    <img src={leaders[0].avatar} alt={leaders[0].name} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '5px solid #FFD700' }} />
                                </div>
                                <h3 style={{ margin: '10px 0 5px', fontSize: '1.3em' }}>{leaders[0].name}</h3>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#FFD700' }}>{leaders[0].points} pts</p>
                                <div style={{ height: '160px', width: '120px', background: 'linear-gradient(180deg, #FFDEE9 0%, #B5FFFC 100%)', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4rem', color: 'white', fontWeight: 'bold', marginTop: '15px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>1</div>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {leaders[2] && (
                            <div className="podium-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={leaders[2].avatar} alt={leaders[2].name} style={{ width: '70px', height: '70px', borderRadius: '50%', border: '4px solid #CD7F32' }} />
                                    <Medal size={24} color="#CD7F32" style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: 'white', borderRadius: '50%' }} />
                                </div>
                                <h3 style={{ margin: '10px 0 5px' }}>{leaders[2].name}</h3>
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#CD7F32' }}>{leaders[2].points} pts</p>
                                <div style={{ height: '90px', width: '100px', background: 'linear-gradient(180deg, #FFE4B5 0%, #FFDAB9 100%)', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', color: 'white', fontWeight: 'bold', marginTop: '15px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)' }}>3</div>
                            </div>
                        )}
                    </div>

                    {/* Rest of the list */}
                    <div className="leaderboard-list" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Star size={24} color="#4318FF" /> Top Participants
                        </h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {leaders.slice(3).map((leader, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    padding: '1rem 1.5rem', 
                                    background: leader.isCurrentUser ? 'rgba(67, 24, 255, 0.08)' : 'white', 
                                    borderRadius: '15px', 
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                    border: leader.isCurrentUser ? '1px solid var(--primary-color)' : '1px solid transparent',
                                    transition: 'transform 0.2s',
                                    outline: 'none',
                                }}>
                                    <div style={{ width: '40px', fontWeight: 'bold', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>#{index + 4}</div>
                                    <img src={leader.avatar} alt={leader.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '1.5rem' }} />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                                            {leader.name}
                                            {leader.isCurrentUser && <span style={{ marginLeft: '10px', fontSize: '0.8rem', background: 'var(--primary-color)', color: 'white', padding: '2px 8px', borderRadius: '10px' }}>You</span>}
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{leader.role}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                                        <Flame size={20} color="#FF5B5B" /> {leader.points}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
