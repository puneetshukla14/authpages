// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const newUser = await User.create({ username, email, password });

    return NextResponse.json({ message: 'User created', userId: newUser._id }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
