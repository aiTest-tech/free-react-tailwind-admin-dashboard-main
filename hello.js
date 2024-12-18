import jwt from 'jsonwebtoken';

const secretKey = 'OiLzQ5i0gRnslKw6Jzp3papf58xoo6jO';

export const encodePassword = (password) => {
    const token = jwt.sign({ password }, secretKey, { expiresIn: '1h' }); // Add expiry for security
    return token;
};


const password = 'demo@1234';
const encodedPassword = encodePassword(password);
console.log('Encoded Password:', encodedPassword);