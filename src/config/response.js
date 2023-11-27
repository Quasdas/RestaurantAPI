 const responseData = (res,message,data,statuscode)=>{
    res.status(statuscode).json({
        message:message,
        content:data,
        date: new Date()
    })
}
export default responseData