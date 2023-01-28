module.exports = (error, req, res, next) => {
    const errStatus = error.statusCode || 500;
    const errMsg = error.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    }); 
}