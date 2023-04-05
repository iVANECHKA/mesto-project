export default class UserInfo {
    constructor({ userName, userDescription, userAvatar}) {
        this._profileName = userName;
        this._profileDescription = userDescription;
        this._profileAvatar = userAvatar;
    }

    getUserInfo() {
        const data = {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        }

        return data;
    }

    setUserInfo({name, description}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }

    setUserAvatar({avatarLink}) {
        this._profileAvatar.src = avatarLink;
    }


}
