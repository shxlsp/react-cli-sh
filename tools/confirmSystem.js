var platform = process.platform; 
// switch(platform) { 
//     case 'aix':  
//         console.log("IBM AIX platform"); 
//         break; 
//     case 'darwin':  
//         console.log("Darwin platfrom(MacOS, IOS etc)"); 
//         break; 
//     case 'freebsd':  
//         console.log("FreeBSD Platform"); 
//         break; 
//     case 'linux':  
//         console.log("Linux Platform"); 
//         break; 
//     case 'openbsd':  
//         console.log("OpenBSD platform"); 
//         break; 
//     case 'sunos':  
//         console.log("SunOS platform"); 
//         break; 
//     case 'win32':
//         console.log("windows platform"); 
//         break;     
//     default:  
//         console.log("unknown platform"); 
// }

const isWindows = () => {
    return process.platform === 'win32'
}

module.exports = {
    isWindows
}