/**
 * Created by igor on 4/3/18.
 */
const {existsSync, writeFile, appendFile} =  require ('fs');

const promisify = fn => (...data) => {
    return new Promise((ok, bad) => {
        fn.call(fn, ...data, (err, ...res) => {
            if (err) return bad(err);
            ok (...res);
        })
    });
}

const prWriteFile  = promisify(writeFile);
const prAppendFile = promisify(appendFile);

const pathLog = `${__dirname}/log.txt`;

const createIfNotExist = async () => {
    if (!existsSync(pathLog))
        await prWriteFile(pathLog, '');

    return true;
};

const clear = async ()  => {
    await createIfNotExist();
    await writeFile(pathLog, '');

    return true;
};

const add = async (mess, data) => {
    await createIfNotExist();
    await prAppendFile(pathLog, '[Info]' + mess +'\n Data is -> \n' + JSON.stringify(data, null, '\t') + '\n\n');

    return true;
};

const err = async (err) => {
    await createIfNotExist();
    let text = '[Err] ';

    if (typeof err === 'string') text += err;
    else {
        if (err.message) text += err.message;
        else text += JSON.stringify(err, null, '\n');

        if (err.stack) text += 'TRACE: \n ' + JSON.stringify(err.stack, null, '\n');
    }

    await prAppendFile(pathLog, text.replace(/\\n/g, '\n') + '\n\n');

    return true;

};

module.exports = {
    clear,
    add,
    err,
};