const validateUser = (req, res, next) => {
    const { UserID, Username, UserPassword, UserFullName, UserCtcNo, UserEmail, UserRole, Company } = req.body;
    
    // Validate UserID 
    const userIDPattern = /^ACC\d{7}$/;
    if (!userIDPattern.test(UserID)) {
        return res.status(400).json({ message: 'UserID must start with "ACC" followed by 7 digits' });
    }

    // Validate Username 
    if (!Username || typeof Username !== 'string') {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Validate UserPassword 
    if (!UserPassword || UserPassword.length < 6) {
        return res.status(400).json({ message: 'UserPassword must be at least 6 characters long' });
    }

    // Validate UserFullName 
    if (!UserFullName || typeof UserFullName !== 'string') {
        return res.status(400).json({ message: 'UserFullName is required' });
    }

    // Validate UserCtcNo
    const contactNoPattern = /^\d{1,20}$/; // Shouldbe between 1 to 20 digits
    if (!contactNoPattern.test(UserCtcNo)) {
        return res.status(400).json({ message: 'UserCtcNo must be a number between 1 and 20 digits' });
    }

    // Validate UserEmail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(UserEmail)) {
        return res.status(400).json({ message: 'UserEmail must be a valid email address' });
    }

    // Validate UserRole 
    const validRoles = ['User', 'Admin', 'Operator', 'Content Creator']; 
    if (!validRoles.includes(UserRole)) {
        return res.status(400).json({ message: 'UserRole must be either "User", "Admin", "Operator", or "Content Creator".' });
    }

    // Validate Company 
    if (!Company || typeof Company !== 'string') {
        return res.status(400).json({ message: 'Company is required' });
    }

    next();
};

export { validateUser };
