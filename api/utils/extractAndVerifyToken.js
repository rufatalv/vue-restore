import jwt from 'jsonwebtoken';

const extractAndVerifyToken = (headers) => {
    if (!headers || !headers.authorization) {
        throw new Error('Authorization header not found.');
    }

    const tokenParts = headers.authorization.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new Error('Invalid authorization header format.');
    }

    const token = tokenParts[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default extractAndVerifyToken;