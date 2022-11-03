import fs from "fs";
import async from "async";


function removeFolder(location, next) {
    fs.readdir(location, function (err, files) {
        async.each(files, function (file, cb) {
            file = location + '/' + file
            fs.stat(file, function (err, stat) {
                if (err) {
                    return cb(err);
                }
                if (stat.isDirectory()) {
                    removeFolder(file, cb);
                } else {
                    fs.unlink(file, function (err) {
                        if (err) {
                            return cb(err);
                        }
                        return cb();
                    })
                }
            })
        }, function (err) {
            if (err) return next();
            fs.rmdir(location, function (err) {
                console.log("1 upload")
            })
        })
    })
}
function createFolder(location, err){
  
    if (!fs.existsSync(location,err)){
        //Efetua a criação do diretório
        fs.mkdir(location, (err) => {
            if (err) {
                console.log(err);
                return
            }
    
            console.log("Uploads available")
        });
     
}
}


export {removeFolder,createFolder}