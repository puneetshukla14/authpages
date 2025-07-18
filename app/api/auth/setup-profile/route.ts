import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Optional: basic validation
    // Accept all fields as optional for now
    const { fullName, bio, age, profilePicture } = data;

    // You can add further validation if needed
    // For example, check types or lengths here

    // TODO: Save profile data to database here
    // For now, just respond success with received data
    return NextResponse.json({
      message: 'Profile setup successful',
      profile: { fullName, bio, age, profilePicture },
    });
  } catch (error) {
    console.error('Setup profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
