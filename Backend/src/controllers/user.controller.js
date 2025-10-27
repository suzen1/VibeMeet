import User from "../models/User";

export async function getRecommendedUser(req ,res) {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const RecommendedUser = await User.find({
            $and:[
                {_id:{$ne: currentUserId}},
                {}
            ]
        })

    } catch (error) {
        
    }
}

export async function getMyFriends(req, res) {
    
}