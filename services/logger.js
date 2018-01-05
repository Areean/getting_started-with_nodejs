
const winston = require('winston')

module.exports=(()=>{
    winston.configure({
        transports: [
            new (winston.transports.File)({ filename: './logs/logs.log' })
        ]  
    })
    return{
        log:(message)=>{
            winston.log('info', message);
        }
    }
})();