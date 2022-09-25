
const { format } = require('path');

function encode(input) {
    output = ""
    var i = 0;
    while (i<input.length ){
        var letter = input.charAt(i);
        var count = 1;
        while ((input.charAt(count+i)==letter) && count+i<input.length && count<255) count++;
        if (count!=1 || letter == "#"){
            if (count<=3 && letter != "#"){
                output += letter.repeat(count);
            } else{
                output += "#" + String.fromCharCode(count) + letter;
            }
        } else{
            output +=  letter;
        }
        i+=count;

    }
    return output;
}


function decode(input) {
    var i = 0;
    output = ""
    while (i<input.length) {
        if (input.charAt(i) == '#') {
            i++;
            let count = input.charCodeAt(i);
            let letter = input.charAt(i+1);
            output += letter.repeat(count);
            i += 1 +1;
        } else{
            output += input.charAt(i);
            i+=1;
        }
    }
    return output;
}

var [func , filename, target] = process.argv.slice(2,5)//, process.argv[3], process.argv[4];

if (target) {
    
    var fs = require('fs');

    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(`File ${filename} doesn\'t exist`);

        } else{
            raw_text =  data.toString();
            
            switch (func) {
                case "decode":
                    converted_text = decode(raw_text);
                    break;
                case "encode":
                    converted_text = encode(raw_text);
                    difference = converted_text.length/raw_text.length;
                    console.log(`%difference:${difference}`);
                    break;
            }
            
            fs.writeFileSync(target,converted_text, (err)=> {
                if (err)  console.log("Unexpected error");
            });
                               
        }
    })
} else {
    console.error("Enter all parameters");
}
