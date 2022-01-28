interface IClearUserDataOptions {
    email?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}

const clearUserData = (payload: any, options?: IClearUserDataOptions) => {
    const copyUser = { ...payload }

    delete copyUser.username_lower;
    delete copyUser.password;
    delete copyUser.access_token;
    delete copyUser.refresh_token;

    if (options !== undefined) {
        const objectEntries = Object.entries(options);

        objectEntries.forEach((arr) => {
            const [ key, value ] = arr;

            if (copyUser[key] !== undefined && value) {
                delete copyUser[key]
            }
        })
    }

    return copyUser;
}

export default clearUserData;