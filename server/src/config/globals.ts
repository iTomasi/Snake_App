const globalsCfg = {
    JWT_SECRET: process.env.JWT_SECRET || "asdkslajdaklsjd",
    USER_FIELDS_ALLOWED: {
        profile_picture: true
    }
};

export default globalsCfg;