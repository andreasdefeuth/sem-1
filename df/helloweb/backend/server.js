import express from 'express';

const port = 3000;
const server = express();
server.use(onEachRequest);
server.get('/api/greeting', onGetGreeting);
server.get('/api/timestamp', onGetTimestamp);
server.get('/api/now', onGetNow);
server.get('/api/staff/:id', onGetStaffById);
server.listen(port, onServerReady);

function onGetGreeting(request, response) {
    response.json('hello, web world!');
}

function onGetTimestamp(request, response) {
    response.json(['timestamp', new Date()]);
}

function onGetNow(request, response) {
    response.json({now: Date.now()});
}

const staff = [
    { name: 'Alice', age: 19, role: 'programmer', dept: 'IT'},
    { name: 'Bob', age: 22, role: 'tester', dept: 'IT'},
];

function onGetStaffById(request, response) {
    const id = parseInt(request.params.id);
    const format = request.query.format;
    const fields = request.query.field;


    if (0 <= id && id < staff.length) {
        const staffMember = staff[id];
        if (format === 'dict' || format === undefined) {
            if (fields === undefined) { // no fields specified, include all
                response.json(staffMember);
            } else if (typeof fields === 'string') { // just one field specified
                response.json(buildStaffDict(staffMember, [fields]));
            } else { // multiple fields specified
                response.json(buildStaffDict(staffMember, fields));
            }
        } else if (format === 'string') {
            response.json(`${staffMember.name} is a ${staffMember.age}-year-old ${staffMember.role} in ${staffMember.dept}`);
        } else {
            response.sendStatus(400);
        }
    } else {
        response.sendStatus(404);
    }
}

function buildStaffDict(staffMember, fields) {
    const dict = {};
    let i = 0;
    while (i < fields.length) {
        dict[fields[i]] = staffMember[fields[i]];
        i = i + 1;
    }
    return dict;
}

function onServerReady() {
    console.log('Webserver running on port', port);
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}