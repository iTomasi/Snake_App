const clearUserData = (payload: any) => {
    const copyUser = { ...payload }

    delete copyUser.username_lower;
    delete copyUser.password;
    delete copyUser.access_token;
    delete copyUser.refresh_token;

    return copyUser;
}

export default clearUserData;