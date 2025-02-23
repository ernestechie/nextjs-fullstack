import { connect } from '@/db/db.config';
import UserModel from '@/models/UserModel';

import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1: Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return NextResponse.json(
        { status: false, message: 'Invalid email or password' },
        { status: 401 }
      );

    // 2. Check if password is correct
    const passwordIsValid = await bcryptjs.compare(
      password,
      existingUser.password
    );

    console.log({ email, password, passwordIsValid });

    if (!passwordIsValid)
      return NextResponse.json(
        { status: false, message: 'Invalid email or password' },
        { status: 401 }
      );

    return NextResponse.json(
      {
        status: true,
        message: 'Login Successfully',
        data: { user: existingUser },
      },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unexpected error occured!';
    console.log('SIGNUP Error ->', err);

    return NextResponse.json(
      { status: false, message: errorMessage },
      { status: 400 }
    );
  }
}
