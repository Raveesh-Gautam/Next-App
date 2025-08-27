import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function  middleware(req){
    const token=req.cookies.get('token')?.value;
    const user=token? await verifyToken(token):null;
    if(!user){
        return NextResponse.redirect(new URL("/login",req.url));
    }
    return NextResponse.next();
}
export const config={
    matcher:["/dashboard/:path*"]
}