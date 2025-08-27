// get request 
let studentData=[
    {id:1,name:'Mohan'},
    {id:2,name:"rohan"}
]
export function GET(){
    return Response.json(studentData);
}
export  async function POST(request){
const data= await request.json();
let newUser={
    id:studentData.length+1,
    name:data.name
}
studentData.push(newUser);
return Response.json(studentData,{status:201});
}