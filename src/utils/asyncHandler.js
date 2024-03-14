const asyncHandler = (requestHandler) =>{
    (err, req,res,next) => {
        Promise.resolve(requestHandler(err,req, res, next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}

// const asyncHandler = () => {}
// const asyncHandler = (fun)=>()=>{}
// const asyncHandler = (fun)=> async ()=>{}

// const asyncHandler = (fun) => async (err,req,res,next)=> {
//     try {
//         await fun(req,res,next)
//     } catch (error) {
//         res.status(error.status || 404).json({
//             success : false,
//             message : err.message
//         }) 
//     }
// } //its the try catch method but we use promise formate