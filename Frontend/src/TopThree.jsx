import crownGold from './assets/crown-gold.png';
import crownSilver from './assets/crown-silver.png';
import crownBronze from './assets/crown-bronze.png';

const crownMap = [
    {
        rank: crownGold,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2FQ72FWEtzxniuTGYHMNDjFiJ0p2ULQELg&s'
    },
    {
        rank: crownSilver,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU'
    },
    {
        rank: crownBronze,
        avatar: 'https://img.freepik.com/premium-photo/icon-button-man_665280-69540.jpg?semt=ais_hybrid&w=740'
    },
]

const TopThree = ({ topThreeUsers }) => {
    return (
        <div className="flex justify-center gap-6 mt-12 mb-5">
            {topThreeUsers.map((user, index) => (
                <div
                    key={user._id}
                    className={`bg-white p-4 rounded-xl shadow-lg text-center relative w-40 ${index === 1 ? 'scale-110 z-10' : ''
                        }`}
                >
                    {/* Crown */}
                    <img
                        src={crownMap[index].rank}
                        alt="crown"
                        className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10"
                    />

                    {/* Avatar */}
                    <img
                        src={crownMap[index].avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full mx-auto border-2 border-yellow-400"
                    />

                    {/* Name */}
                    <p className="mt-2 font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500 mt-1">
                        {user.points}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TopThree;
