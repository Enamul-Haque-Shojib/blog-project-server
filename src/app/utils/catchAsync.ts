import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>{ 
      // res.status(500).json({
      //                 success: false,
      //                 message: err.message || 'Something went wrong.',
      //                 data: err,
      //             })
      next(err)
      });
  };
};

export default catchAsync;



// const firstFunction=(fn)=>{         
//   return ()=>{                    // ()=>{} = mainFunction()
//    Promise.resolve(fn)
//   };
// }

// const mainFunction = firstFunction(()=>{
//   console.log('promise function')            // fn()
// });
  
// console.log('--->',mainFunction())




// const firstFunction=(fn)=>{         
//   return ()=>{                    
 
//         console.log(fn())
//         console.log('2nd funcit')
//         return 10
//   };
// }

// const mainFunction = firstFunction(()=>{
//   console.log('promise function')
//   return 5
// });
  
// console.log('--->',mainFunction())
// //---------------------------------------------------
// const mainFunction =()=>{
//     const fn=()=>{
//         console.log('promise function')
//         return 5
//     }
//     console.log(fn())
//     console.log('2nd funcit')
//     return 10
// }

// console.log(mainFunction())
