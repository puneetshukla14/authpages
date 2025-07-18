import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  await connectToDB();
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
